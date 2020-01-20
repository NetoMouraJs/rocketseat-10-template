const { MissingParamsError, InvalidParamsError } = require('../presentation/utils/errors')

module.exports = class LoadUserByGithubUseCase {
  constructor ({ userGithubService } = {}) {
    this._userGithubService = userGithubService
  }

  async load (github_username, techs) {
    if (!github_username) {
      throw new MissingParamsError('github_username')
    }

    if (!techs) {
      throw new MissingParamsError('techs')
    }

    if (techs.length <= 1) {
      throw new InvalidParamsError('techs')
    }

    const user = this._userGithubService.load(github_username)

    return user
  }
}
