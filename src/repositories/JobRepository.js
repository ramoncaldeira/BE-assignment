const { Op } = require('sequelize')
const { sequelize, Contract, Job, Profile } = require('../models')
const ContractStatus = require('../enums/ContractStatus')

class JobRepository {
  static async findBestProfessionInDateRange(start, end) {
    return await Job.findOne({
      attributes: [
        [sequelize.col('Contract.Contractor.profession'), 'bestProfession'],
        [sequelize.fn('sum', sequelize.col('Job.price')), 'priceSum'],
      ],
      raw: true,
      include: [
        {
          model: Contract,
          attributes: [],
          include: [
            {
              model: Profile,
              as: 'Contractor',
              attributes: []
            }
          ],
        }
      ],
      where: {
        paid: true,
        paymentDate: {
          [Op.between]: [start, end]
        }
      },
      order: [
        [sequelize.fn('sum', sequelize.col('Job.price')), 'DESC'],
      ],
      group: ['bestProfession']
    })
  }

  static async calculateTotalJobsToPayByClient(ClientId) {
    const result = await Job.findOne({
      attributes: [[sequelize.fn('sum', sequelize.col('price')), 'totalJobsToPay']],
      raw: true,
      include: [
        {
          model: Contract,
          attributes: [],
          where: {
            status: ContractStatus.IN_PROGRESS,
            ClientId
          }
        }
      ]
    })

    return result.totalJobsToPay
  }

  static async findAllUnpaidWithActiveContractsByProfile(profileId) {
    return await Job.findAll({
      include: [
        {
          model: Contract,
          where: {
            status: ContractStatus.IN_PROGRESS,
            [Op.or]: [
              { ClientId: profileId },
              { ContractorId: profileId }
            ]
          }
        }
      ],
      where: {
        paid: null
      }
    })
  }
}

module.exports = JobRepository