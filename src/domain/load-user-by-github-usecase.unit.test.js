const { MissingParamsError, InvalidParamsError } = require('../presentation/utils/errors')

const LoadUserByGithubUseCase = require('./load-user-by-github-usecase')

class UserGithubServiceFake {
  load (github_username) {
    return { github_username }
  }
}
class UserGithubServiceWithError {
  load (github_username) {
    throw new Error()
  }
}

const makeSut = () => {
  const userGithubServiceFake = new UserGithubServiceFake()
  const sut = new LoadUserByGithubUseCase({ userGithubService: userGithubServiceFake })
  return { sut, userGithubServiceFake }
}

describe('LoadUserByGithubUseCase', () => {
  test('Should return 400 if github_username does not provide', () => {
    const { sut } = makeSut()
    const promise = sut.load()
    expect(promise).rejects.toThrow(new MissingParamsError('github_username'))
  })

  test('Should return 400 if techs does not provide', () => {
    const { sut } = makeSut()
    const promise = sut.load('any_username')
    expect(promise).rejects.toThrow(new MissingParamsError('techs'))
  })

  test('Should return 500 if techs does not provide correctly', () => {
    const { sut } = makeSut()
    const promise = sut.load('any_username', [])
    expect(promise).rejects.toThrow(new InvalidParamsError('techs'))
  })

  test('Should return 200 if correct values are provide', async () => {
    const { sut } = makeSut()
    const user = sut.load('any_username', ['one_any_techs', 'two,any_techs'])

    expect(user).not.toBeNull()
  })

  test('Should test the UserGithubService integration dependency on LoadUserByGithubUseCase', async () => {
    const { sut, userGithubServiceFake } = makeSut()
    const user = await sut.load('any_username', ['one_any_techs', 'two,any_techs'])
    expect(user.github_username).not.toBeNull(userGithubServiceFake._github_username)
  })

  test('Should receive throw exception when does not provide UserGithubService dependecy', async () => {
    const sut = new LoadUserByGithubUseCase()
    const promise = sut.load('any_username', ['one_any_techs', 'two,any_techs'])
    expect(promise).rejects.toThrow()
  })

  test('Should receive throw exception when does not provide any method on UserGithubService dependecy', async () => {
    const sut = new LoadUserByGithubUseCase({})
    const promise = sut.load('any_username', ['one_any_techs', 'two,any_techs'])
    expect(promise).rejects.toThrow()
  })

  test('Should receive throw exception when any dependecy provide gave exception', async () => {
    const userGithubServiceWithError = new UserGithubServiceWithError()
    const sut = new LoadUserByGithubUseCase({ UserGithubService: userGithubServiceWithError })
    const promise = sut.load('any_username', ['one_any_techs', 'two,any_techs'])
    expect(promise).rejects.toThrow()
  })
})
