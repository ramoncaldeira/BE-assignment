const express = require('express')
const JobRepository = require('../repositories/JobRepository')
const ProfileRepository = require('../repositories/ProfileRepository')
const InputValidator = require('../validators/InputValidator')

const router = express.Router()

router.get('/best-profession', async (req, res, next) => {
  // #swagger.tags = ['Admin']

  /* #swagger.responses[400] = {
    description: 'Field is required'
  } */

  /* #swagger.security = [{
    "profileId": []
  }] */

  const { start, end } = req.query

  try {
    InputValidator.validateDateRange(start, end)

    const bestProfession = await JobRepository
      .findBestProfessionInDateRange(start, end)

    res.json(bestProfession)
  }
  catch (err) {
    return next(err)
  }
})

router.get('/best-clients', async (req, res, next) => {
  // #swagger.tags = ['Admin']

  /* #swagger.responses[400] = {
    description: 'Field is required'
  } */

  /* #swagger.security = [{
    "profileId": []
  }] */
  
  const { start, end, limit = 2 } = req.query

  try {
    InputValidator.validateDateRange(start, end)

    const bestClients = await ProfileRepository
      .findBestClientsInDateRange(start, end, limit)

    res.json(bestClients)
  }
  catch (err) {
    return next(err)
  }
})

module.exports = router