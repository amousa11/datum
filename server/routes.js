const routes = require('express').Router();
const mam = require('./mam');

routes.use('/mam', mam);
/**
 * Serve the docs for the api
 */
// const path = require('path');
// routes.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname + '/../doc/index.html'));
// });

module.exports = routes;
