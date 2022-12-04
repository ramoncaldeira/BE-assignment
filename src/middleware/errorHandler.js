const { WebAppError } = require('../errors')

const errorHandler = async (err, req, res, next) => {
  if (err instanceof WebAppError) {
    const {statusCode, message } = err

    return res.status(statusCode).json({
      message
    })
  }

  if (err.name === 'SequelizeTimeoutError') {
    return res.status(504, 'Gateway timeout')
  }

  return res.status(500).send({ 
    message: 'Internal server error'
  })
}

module.exports = { errorHandler }