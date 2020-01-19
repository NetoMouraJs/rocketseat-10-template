class InvalidParamsError extends Error {
  constructor (paramsName) {
    super(`Invalid value sended: ${paramsName}`)
    this.name = 'InvalidParamsError'
  }
}
exports.InvalidParamsError = InvalidParamsError
