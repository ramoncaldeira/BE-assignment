const Sequelize = require('sequelize')
const ProfileType = require('../enums/ProfileType')

module.exports = (sequelize) => {
  class Profile extends Sequelize.Model {
    static associate(models) {
      this.hasMany(models.Contract, { as: 'Contractor', foreignKey: 'ContractorId' })
      this.hasMany(models.Contract, { as: 'Client', foreignKey: 'ClientId' })
    }
  }

  Profile.init(
    {
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      profession: {
        type: Sequelize.STRING,
        allowNull: false
      },
      balance:{
        type: Sequelize.DECIMAL(12, 2)
      },
      type: {
        type: Sequelize.ENUM(
          ProfileType.CLIENT, 
          ProfileType.CONTRACTOR
        )
      }
    },
    {
      sequelize,
      modelName: 'Profile'
    }
  )

  return Profile
}