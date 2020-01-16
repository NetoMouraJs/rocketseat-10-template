const { Router } = require('express')
const axios = require('axios')

const routes = Router()

class ExpressRouteAdapt {
  static adapt (router) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body
      }
      const httpResponse = router.route(httpRequest)

      return res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}

class LoadUserGitHubRoute {
  route (httpRequest) {
    const { github_username: userGithub, techs } = httpRequest.body

    const loadUserGitHub = new LoadUserGitHub().load(userGithub)

    const { name = loadUserGitHub.data.login, avatar_url: avatarGithub, bio: bioGithub } = loadUserGitHub.data

    const developer = DeveloperFactory.add({
      name,
      userGithub,
      avatarGithub,
      bioGithub,
      techs
    })

    const dev = DeveloperRepository(developer).add()

    return {
      statusCode: 200,
      body: dev
    }
  }
}

class LoadUserGitHub {
  async load (userGithub) {
    var loadUserGitHub = await axios.get(`https://api.github.com/users/${userGithub}`)
    return loadUserGitHub
  }
}

class TechsAdapt {
  static adapt (techs) {
    return techs.split(',').map(tech => tech.trim())
  }
}

class DeveloperFactory {
  static add ({ attributes } = {}) {
    attributes.techs = TechsAdapt.adapt(attributes.techs)
    return new Developer(attributes)
  }
}

class Developer {
  constructor (name, nameGithub, avatarGithub, bioGithub, techs) {
    this._name = name
    this._nameGithub = nameGithub
    this._avatarGithub = avatarGithub
    this._bioGithub = bioGithub
    this._techs = techs
  }
}

class DeveloperRepository {
  constructor (developer, developerSchema) {
    this._developer = developer
    this._developerSchema = developerSchema
  }

  async add () {
    const user = await this._developerSchema.create(this._developer)
    return user
  }
}

routes.post('/devs', ExpressRouteAdapt.adapt(new LoadUserGitHubRoute().route))
