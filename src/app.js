const swaggerUi = require('swagger-ui-express')
const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const { getProfile } = require('./middleware/getProfile')
const { errorHandler } = require('./middleware/errorHandler')
const swaggerFile = require('../swagger-output.json')

const app = express()

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(bodyParser.json())
app.use(getProfile)
routes(app)
app.use(errorHandler)

module.exports = app
