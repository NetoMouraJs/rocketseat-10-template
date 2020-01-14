//  Middlewares
const cors = require("./middleware/cors");
const jsonParse = require("./middleware/json-parser");

//  Disables
const XpoweredBy = require("./middleware/disable-x-powered-by");

module.exports = app => {
  app.use(XpoweredBy);
	app.use(jsonParse);
  app.use(cors);
};
