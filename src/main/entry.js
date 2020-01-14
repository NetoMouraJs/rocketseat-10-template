//  Core
const express = require("express");

//  Dependencies
const setupApp = require("./config/setup");

//  Routes
const setupRoutes = require("./config/routes");

//  Vars
const app = express();

//  Setups
setupApp(app);
setupRoutes(app);

app.listen(3000, () => {
  console.log("Server On! -> http://localhost:3000");
});
