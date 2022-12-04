class WebAppError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.message = message
    this.statusCode = statusCode || 400
  }
}

class ProfileIsNotClient extends WebAppError {
  message = 'Profile is not a Client'
  statusCode = 403
}

class UserIsNotClient extends WebAppError {
  message = 'User is not a Client'
  statusCode = 403
}

class UserNotFound extends WebAppError {
  message = 'User not found'
  statusCode = 404
}

class AmountExceedsLimit extends WebAppError {
  message = 'Amount exceeds limit'
  statusCode = 403
}

class ContractNotFound extends WebAppError {
  message = 'Contract not found'
  statusCode = 404
}

class JobAlreadyPaid extends WebAppError {
  message = 'Job already paid'
  statusCode = 403
}

class InsufficientBalance extends WebAppError {
  message = 'Insufficient balance'
  statusCode = 403
}

class ProfileNotFound extends WebAppError {
  message = 'Profile not found'
  statusCode = 401
}

class FieldIsRequired extends WebAppError {
  constructor(field) {
    const message = `Field "${field}" is required`
    super(message, 400)
  }
}

class InvalidDateFormat extends WebAppError {
  constructor(field) {
    const message = `Field "${field}" should have format "YYYY-mm-dd"`
    super(message, 400)
  }
}

class InvalidNumberFormat extends WebAppError {
  constructor(field) {
    const message = `Field "${field}" should have number format`
    super(message, 400)
  }
}

module.exports = {
  WebAppError,
  ProfileIsNotClient,
  UserIsNotClient,
  FieldIsRequired,
  UserNotFound,
  AmountExceedsLimit,
  ContractNotFound,
  JobAlreadyPaid,
  InsufficientBalance,
  ProfileNotFound,
  InvalidDateFormat,
  InvalidNumberFormat
}