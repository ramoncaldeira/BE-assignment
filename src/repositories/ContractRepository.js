const { Op } = require('sequelize')
const { Contract } = require('../models')
const ContractStatus = require('../enums/ContractStatus')

class ContractRepository {
  static async findAllNonTerminatedByProfile(profileId) {
    return await Contract.scope({ method: ['profile', profileId] }).findAll({
      where: {
        status: {
          [Op.ne]: ContractStatus.TERMINATED
        }
      }
    })
  }

  static async findOneByIdAndProfile(id, profileId) {
    return await Contract.scope({ method: ['profile', profileId] }).findOne({ 
      where: { id } 
    })
  }
}

module.exports = ContractRepository