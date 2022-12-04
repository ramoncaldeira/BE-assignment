const { FieldIsRequired, InvalidDateFormat } = require('../errors')

class InputValidator {
  static validateDateRange(start, end) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/

    if (!start) {
      throw new FieldIsRequired('start')
    }

    if (!start.match(dateRegex)) {
      throw new InvalidDateFormat('start')
    }

    if (!end) {
      throw new FieldIsRequired('end')
    }

    if (!end.match(dateRegex)) {
      throw new InvalidDateFormat('end')
    }
  }

  static validateNumber(number, name) {
    const numberRegex = /^\d+$/

    if (!number) {
      throw new FieldIsRequired(name)
    }

    if (!number.toString().match(numberRegex)) {
      throw new InvalidNumberFormat(name)
    }
  }
}

module.exports = InputValidator