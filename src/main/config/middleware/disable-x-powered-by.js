module.exports = (req, res, next) => {
	res.setHeader( 'X-Powered-By', 'Agilbot' )
	next()
}