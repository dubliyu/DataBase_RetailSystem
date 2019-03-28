'use strict';

//DEPENDENCIES===================================================================
const express = require('express');
const routes = require('./components/routes');

//APP SETUP===================================================================
const app = express();
routes.init(app);

//LISTENING===================================================================
app.listen(80, () => console.log("Server is up"));

//CATCH-ALL===================================================================
process.on('uncaughtException', function (er) {
  console.log("Caught ERROR: "+ er.stack);
  process.exit(1);
});
