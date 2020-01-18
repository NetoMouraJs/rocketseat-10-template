module.exports = class TechsAdapt {
  adapt (techs) {
    return techs.split(',').map(tech => tech.trim())
  }
}
