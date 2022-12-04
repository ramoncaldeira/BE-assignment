const adminRoute = require('./admin')
const balancesRoute = require('./balances')
const contractsRoute = require('./contracts')
const jobsRoute = require('./jobs')

module.exports = app => {
  app.use('/admin', adminRoute)
  app.use('/balances', balancesRoute)
  app.use('/contracts', contractsRoute)
  app.use('/jobs', jobsRoute)  
}