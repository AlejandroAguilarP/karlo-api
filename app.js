const express = require('express');
const cors = require('cors');
const router = require('./routes/routes.js');
const bodyParser = require('body-parser');
require('dotenv').config();
const verifyToken = require('./routes/validate-token.js');
const router_auth = require('./routes/router-auth.js');

var app = express();
//middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({origin: '*'}));
app.options('*', cors());
const errorHandler = (error, request, response, next) => {
  // Error handling middleware functionality
  console.log( `error ${error.message}`) // log the error
  const status = error.status || 400
  // send back an easily understandable error message to the caller
  response.status(status).send(error.message)
}

app.use(errorHandler);

app.use(router_auth);
app.use(verifyToken,router);



app.listen(3001, function () {
  console.log('Listening port 3001!');
});