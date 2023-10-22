const routes = require('express').Router();
const verify_token = require('../middleware/auth');

const user_routes = require('./user.route');

routes.use('/', verify_token);
/*  ===== User data Routes =====  */
routes.use('/', user_routes);

module.exports = routes;