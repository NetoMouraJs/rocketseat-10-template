const { MissingParamsError, ServerError } = require('../utils/errors')

module.exports = class HttpResponse {
  static badRequest (paramName) {
    return {
      statusCode: 400,
      body: new MissingParamsError(paramName)
    }
  }

  static serverError () {
    return {
      statusCode: 500,
      body: new ServerError()
    }
  }

  static success (data = '') {
    return {
      statusCode: 200,
      body: data
    }
  }
}
