const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    version: '1.0.0',
    title: 'REST API',
    description: 'Backend test',
  },
  host: 'localhost:3001',
  securityDefinitions: {
    profileId: {
      type: 'apiKey',
      in: 'header',
      name: 'profile_id'
    }
  }
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./src/routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc)