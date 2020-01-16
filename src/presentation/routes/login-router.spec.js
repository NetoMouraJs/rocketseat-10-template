class LoginRoute {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
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

    return {
      statusCode: 200
    }
  }
}

const makeSut = () => {
  return new LoginRoute()
}

describe('LoginRouter', () => {
  test('Should return 200 when fields are provided', () => {
    const sut = makeSut()

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
    const sut = makeSut()

    const httpResponse = sut.route()

    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 when body from HttpRequest does no provide', () => {
    const sut = makeSut()

    const httpRequest = {}
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 400 if userGithub does not provide', () => {
    const sut = makeSut()

    const httpRequest = {
      body: {
        techs: 'one_any_tech,two_any_tech'
      }
    }
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 400 if techs do not provide', () => {
    const sut = makeSut()

    const httpRequest = {
      body: {
        github_username: 'any_user'
      }
    }
    const httpResponse = sut.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
  })
})
