const { Op } = require('sequelize')
const { sequelize, Contract, Job, Profile } = require('../models')

class ProfileRepository {
  static async findBestClientsInDateRange(start, end, limit) {
    return await Profile.findAll({
      attributes: [
        'id',
        [sequelize.literal("firstName || ' ' || lastName"), 'fullName'],
        [sequelize.fn('sum', sequelize.col('Client.Jobs.price')), 'paid'],
      ],
      raw: true,
      subQuery: false,
      include: [
        {
          model: Contract,
          as: 'Client',
          attributes: [],
          include: [
            {
              model: Job,
              attributes: []
            }
          ],
        }
      ],
      where: {
        '$Client.Jobs.paid$': true,      
        '$Client.Jobs.paymentDate$': {
          [Op.between]: [start, end]
        }
      },
      order: [
        [sequelize.fn('sum', sequelize.col('Client.Jobs.price')), 'DESC'],
      ],
      group: ['Profile.id'],
      limit
    })
  }
}

module.exports = ProfileRepository