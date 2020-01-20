class InvalidParamsError extends Error {
  constructor (paramsName) {
    super(`Invalid value sended: ${paramsName}`)
    this.name = 'InvalidParamsError'
  }
}
module.exports = InvalidParamsError
