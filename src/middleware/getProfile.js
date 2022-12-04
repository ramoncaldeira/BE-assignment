const { Profile } = require('../models')
const { ProfileNotFound } = require('../errors')

const getProfile = async (req, res, next) => {
  const profile = await Profile.findOne({ where: { id: req.get('profile_id') || 0 } })
  if (!profile) {
    return next(new ProfileNotFound())
  }
  req.profile = profile
  next()
}

module.exports = { getProfile }