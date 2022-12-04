const express = require('express')
const ProfileService = require('../services/ProfileService')
const ProfileType = require('../enums/ProfileType')
const { 
  ProfileIsNotClient, 
  FieldIsRequired
} = require('../errors')
const InputValidator = require('../validators/InputValidator')

const router = express.Router()

router.post('/deposit/:userId', async (req, res, next) => {
  // #swagger.tags = ['Balances']

  /* #swagger.security = [{
    "profileId": []
  }] */

  /* #swagger.responses[400] = {
    description: 'Field is required'
  } */

  /* #swagger.responses[403] = {
    description: 'Profile is not client'
  } */

  const { userId } = req.params
  const profile = req.profile
  const amount = parseInt(req.body.amount)

  if (profile.type !== ProfileType.CLIENT) {
    return next(new ProfileIsNotClient())
  }

  try {
    InputValidator.validateNumber(amount, 'Amount')

    const targetClient = await ProfileService
      .depositToClientByProfile(amount, userId, profile.id)
    res.json(targetClient)
  }
  catch (err) {
    next(err)
  }
})

module.exports = router