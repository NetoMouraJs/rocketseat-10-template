const LoginRoute = require('./LoginRoute')

const makeSut = () => {
  class LoadUserByGitHubUserCaseFake {
    load (github_username, techs) {
      this._github_username = github_username
      this._techs = techs
    }
  }
  const loadUserByGitHubUserCaseFake = new LoadUserByGitHubUserCaseFake()
  const sut = new LoginRoute({ loadUserByGitHubUserCase: loadUserByGitHubUserCaseFake })
  return {
    sut,
    loadUserByGitHubUserCaseFake
  }
}

describe('LoginRouter', () => {
  test('Should return 200 when fields are provided', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        github_username: 'any_user',
        techs: 'one_any_tech,two_any_tech'
      }
    }

    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(200)
  })

  test('Should return 500 when HttpRequest does no provide', () => {
    const { sut } = makeSut()

    const httpResponse = sut.route()

    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 when body from HttpRequest does no provide', () => {
    const { sut } = makeSut()

    const httpRequest = {}
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 400 if userGithub does not provide', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        techs: 'one_any_tech,two_any_tech'
      }
    }
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 400 if techs do not provide', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        github_username: 'any_user'
      }
    }
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 500 if no LoadUserByGitHubUserCase is provide', () => {
    const sut = new LoginRoute()

    const httpRequest = {
      body: {
        github_username: 'any_user',
        techs: 'one_any_tech,two_any_tech'
      }
    }
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 200 if LoadUserByGitHubUserCase is provide', () => {
    const { sut, loadUserByGitHubUserCaseFake } = makeSut()

    const httpRequest = {
      body: {
        github_username: 'any_user',
        techs: 'one_any_tech,two_any_tech'
      }
    }
    sut.route(httpRequest)

    expect(loadUserByGitHubUserCaseFake._github_username).toBe(httpRequest.body.github_username)
    expect(loadUserByGitHubUserCaseFake._techs).toBe(httpRequest.body.techs)
  })
})
