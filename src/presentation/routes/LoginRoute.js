module.exports = class LoginRoute {
  constructor ({ loadUserByGitHubUserCase } = {}) {
    this._loadUserByGitHubUserCase = loadUserByGitHubUserCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body || !this._loadUserByGitHubUserCase) {
      return {
        statusCode: 500
      }
    }
    const { github_username, techs } = httpRequest.body
    if (!github_username) {
      return {
        statusCode: 400
      }
    }
    if (!techs) {
      return {
        statusCode: 400
      }
    }

    this._loadUserByGitHubUserCase.load(github_username, techs)

    return {
      statusCode: 200
    }
  }
}
