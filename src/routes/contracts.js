const express = require('express')
const { Op } = require('sequelize')
const { Contract } = require('../models')
const ContractRepository = require('../repositories/ContractRepository')
const { ContractNotFound } = require('../errors')

const router = express.Router()

/**
 * @returns contract by id
 */
 router.get('/:id', async (req, res, next) => {
  // #swagger.tags = ['Contracts']

  /* #swagger.security = [{
    "profileId": []
  }] */

  /* #swagger.responses[404] = {
    description: 'Contract not found'
  } */

  const { id } = req.params
  const contract = await ContractRepository.findOneByIdAndProfile(id, req.profile.id)

  if (!contract) {
    return next(new ContractNotFound())
  }

  res.json(contract)
})

router.get('/', async (req, res) => {
  // #swagger.tags = ['Contracts']

  /* #swagger.security = [{
    "profileId": []
  }] */
  
  const contracts = await ContractRepository.findAllNonTerminatedByProfile(req.profile.id)
  res.json(contracts)
})

module.exports = router