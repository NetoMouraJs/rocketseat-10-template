const HttpResponse = require('../utils/HttpResponse')

module.exports = class SignUpRoute {
  constructor ({ loadUserByGitHubUserCase, techsAdapt } = {}) {
    this._loadUserByGitHubUserCase = loadUserByGitHubUserCase
    this._techsAdapt = techsAdapt
  }

  async route (httpRequest) {
    try {
      let { github_username, techs } = httpRequest.body
      if (!github_username) {
        return HttpResponse.badRequest('github_username')
      }
      if (!techs) {
        return HttpResponse.badRequest('techs')
      }

      techs = this._techsAdapt.adapt(techs)

      await this._loadUserByGitHubUserCase
        .load(github_username, techs)

      return HttpResponse.success()
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}
