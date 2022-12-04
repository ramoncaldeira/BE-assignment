const express = require('express')
const JobRepository = require('../repositories/JobRepository')
const JobService = require('../services/JobService')
const { ProfileIsNotClient } = require('../errors')
const ProfileType = require('../enums/ProfileType')

const router = express.Router()

router.get('/unpaid', async (req, res) => {
  // #swagger.tags = ['Jobs']

  /* #swagger.security = [{
    "profileId": []
  }] */

  const jobs = await JobRepository
    .findAllUnpaidWithActiveContractsByProfile(req.profile.id)
  res.json(jobs)
})

router.post('/:job_id/pay', async (req, res, next) => {
  // #swagger.tags = ['Jobs']

  /* #swagger.security = [{
    "profileId": []
  }] */

  /* #swagger.responses[403] = {
    description: 'Profile is not client'
  } */

  if (req.profile.type !== ProfileType.CLIENT) {
    return next(new ProfileIsNotClient())
  }

  const { job_id: jobId } = req.params
  const profileId = req.get('profile_id')

  try {
    const job = await JobService
      .payJobByProfile(jobId, profileId)
    res.json(job)
  } catch (err) {
    return next(err)
  }
})

module.exports = router