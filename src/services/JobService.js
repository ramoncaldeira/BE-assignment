const Sequelize = require('sequelize')
const { sequelize, Job, Profile } = require('../models')
const {
  JobAlreadyPaid,
  InsufficientBalance
} = require('../errors')

class JobService {
  static async payJobByProfile(jobId, profileId) {
    return await sequelize.transaction({ 
      type: Sequelize.Transaction.TYPES.EXCLUSIVE
    }, async () => {
      const job = await Job.findByPk(jobId)
      const profile = await Profile.findByPk(profileId)

      if (job.paid) {
        throw new JobAlreadyPaid()
      }

      if (job.price > profile.balance) {
        throw new InsufficientBalance()
      }

      await job.update({
        paid: true,
        paymentDate: Date.now()
      })

      await profile.update({
        balance: profile.balance - job.price
      })

      return job
    })
  }
}

module.exports = JobService