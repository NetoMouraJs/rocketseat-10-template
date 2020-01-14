module.exports = (req, res, next) => {
  res.set("access-control-allow-oring", "*");
	res.set("access-control-allow-methods", "*");
  res.set("access-control-allow-headers", "*");
	next();
}
