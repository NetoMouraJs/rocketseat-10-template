const SignUpRoute = require('./signup-route')
const { MissingParamsError, ServerError } = require('../utils/errors')

class LoadUserByGitHubUserCaseWithError {
  async load (github_username, techs) {
    throw new Error()
  }
}
class TechsAdaptWithError {
  adapt (techs) {
    throw new Error()
  }
}

class TechsAdaptFake {
  adapt (techs) {
    this._techs = techs
    return this._techs
  }
}

class LoadUserByGitHubUserCaseFake {
  load (github_username, techs) {
    this._github_username = github_username
    this._techs = techs
  }
}
const makeSut = () => {
  const techsAdaptFake = new TechsAdaptFake()
  const loadUserByGitHubUserCaseFake = new LoadUserByGitHubUserCaseFake()

  const sut = new SignUpRoute(
    {
      loadUserByGitHubUserCase: loadUserByGitHubUserCaseFake,
      techsAdapt: techsAdaptFake
    }
  )
  return {
    sut,
    loadUserByGitHubUserCaseFake,
    techsAdaptFake
  }
}

describe('SignUpRouter', () => {
  test('Should return 200 when HttpRequest are provided with correct values', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        github_username: 'any_user',
        techs: 'one_any_tech,two_any_tech'
      }
    }
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(200)
  })

  test('Should return 400 if github_username does not provide', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        techs: 'one_any_tech,two_any_tech'
      }
    }
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError('github_username'))
  })

  test('Should return 400 if techs do not provide', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        github_username: 'any_user'
      }
    }
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamsError('techs'))
  })

  test('Should return 500 when HttpRequest does no provide', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.route()

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 when body from HttpRequest does no provide', async () => {
    const { sut } = makeSut()

    const httpRequest = {}
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if no LoadUserByGitHubUserCase is provide', async () => {
    const sut = new SignUpRoute()

    const httpRequest = {
      body: {
        github_username: 'any_user',
        techs: 'one_any_tech,two_any_tech'
      }
    }
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if LoadUserByGitHubUserCase has no body', async () => {
    const sut = new SignUpRoute({})

    const httpRequest = {
      body: {
        github_username: 'any_user',
        techs: 'one_any_tech,two_any_tech'
      }
    }
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if LoadUserByGitHubUserCase throws exception', async () => {
    const loadUserByGitHubUserCaseWithError = new LoadUserByGitHubUserCaseWithError()
    const sut = new SignUpRoute({ loadUserByGitHubUserCase: loadUserByGitHubUserCaseWithError })

    const httpRequest = {
      body: {
        github_username: 'any_user',
        techs: 'one_any_tech,two_any_tech'
      }
    }
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 200 if LoadUserByGitHubUserCase is provide', async () => {
    const { sut, loadUserByGitHubUserCaseFake } = makeSut()

    const httpRequest = {
      body: {
        github_username: 'any_user',
        techs: 'one_any_tech,two_any_tech'
      }
    }
    await sut.route(httpRequest)

    expect(loadUserByGitHubUserCaseFake._github_username).toBe(httpRequest.body.github_username)
    expect(loadUserByGitHubUserCaseFake._techs).toBe(httpRequest.body.techs)
  })

  test('Should return 500 if TechsAdapt does not provide', async () => {
    const loadUserByGitHubUserCase = new LoadUserByGitHubUserCaseFake()
    const sut = new SignUpRoute({ loadUserByGitHubUserCase })
    const httpRequest = {
      body: {
        github_username: 'any_user',
        techs: 'one_any_tech,two_any_tech'
      }
    }
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if TechsAdapt has no body', async () => {
    const loadUserByGitHubUserCase = new LoadUserByGitHubUserCaseFake()
    const techsAdaptWithError = {}
    const sut = new SignUpRoute({ loadUserByGitHubUserCase, techsAdapt: techsAdaptWithError })
    const httpRequest = {
      body: {
        github_username: 'any_user',
        techs: 'one_any_tech,two_any_tech'
      }
    }
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if TechsAdapt throws exception', async () => {
    const loadUserByGitHubUserCase = new LoadUserByGitHubUserCaseFake()
    const techsAdaptWithError = new TechsAdaptWithError()
    const sut = new SignUpRoute({ loadUserByGitHubUserCase, techsAdapt: techsAdaptWithError })
    const httpRequest = {
      body: {
        github_username: 'any_user',
        techs: 'one_any_tech,two_any_tech'
      }
    }
    const httpResponse = await sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 200 if TechsAdapt is provide', async () => {
    const { sut, techsAdaptFake } = makeSut()

    const httpRequest = {
      body: {
        github_username: 'any_user',
        techs: 'one_any_tech,two_any_tech'
      }
    }
    await sut.route(httpRequest)

    expect(techsAdaptFake._techs).toBe(httpRequest.body.techs)
  })
})
