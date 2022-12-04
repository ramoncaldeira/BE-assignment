const { Op } = require('sequelize')
const Sequelize = require('sequelize')
const ContractStatus = require('../enums/ContractStatus')

module.exports = (sequelize) => {
  class Contract extends Sequelize.Model {
    static associate(models) {
      this.belongsTo(models.Profile, { as: 'Contractor' })
      this.belongsTo(models.Profile, { as: 'Client' })
      this.hasMany(models.Job)
    }
  }

  Contract.init(
    {
      terms: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      status:{
        type: Sequelize.ENUM(
          ContractStatus.NEW,
          ContractStatus.IN_PROGRESS,
          ContractStatus.TERMINATED
        )
      }
    },
    {
      scopes: {
        profile(profileId) {
          return {
            where: {
              [Op.or]: [
                { ClientId: profileId },
                { ContractorId: profileId }
              ]
            }
          }
        }
      },
      sequelize,
      modelName: 'Contract'
    }
  )

  return Contract
}