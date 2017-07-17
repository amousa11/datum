'use strict'
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

/**
 * Config to handle POSTs to API
 *  - Parse JSON and URL encode
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

/**
 * Set static assets directory
 * for documentation
 */
// app.use(express.static(path.join(__dirname, '../doc')));

/**
 * Set up API routes
 */
const routes = require('./routes');
app.use('/', routes);
setInterval(function() {console.log("Checking....");}, 3000);

// get the intended port number, use port 3031 if not provided
const port = process.env.PORT || 3031;

const server = app.listen(port, (err) => {
  if (err) {
    console.log((err.message));
  } else {
    console.log('App listening on port ' + port);
  }
});

module.exports = server;
