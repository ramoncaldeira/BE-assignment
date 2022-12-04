const Sequelize = require('sequelize')
const { Profile, sequelize } = require('../models')
const {
  UserIsNotClient,
  UserNotFound,
  AmountExceedsLimit
} = require('../errors')
const JobRepository = require('../repositories/JobRepository')
const ProfileType = require('../enums/ProfileType')

class ProfileService {
  static async depositToClientByProfile(amount, userId, profileId) {
    return await sequelize.transaction({ 
      type: Sequelize.Transaction.TYPES.EXCLUSIVE
    }, async () => {
      const targetClient = await Profile.findByPk(userId)

      if (!targetClient) {
        throw new UserNotFound()
      }

      if (targetClient.type !== ProfileType.CLIENT) {
        throw new UserIsNotClient()
      }

      const totalJobsToPay = await JobRepository
        .calculateTotalJobsToPayByClient(profileId)
      const maxDepositAllowed = totalJobsToPay * 0.25

      if (amount > maxDepositAllowed) {
        throw new AmountExceedsLimit()
      }

      await targetClient.update({
        balance: targetClient.balance + amount
      })

      return targetClient
    })
  }
}

module.exports = ProfileService