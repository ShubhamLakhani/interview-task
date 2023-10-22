'use strict';
const path = require('path');
const envPath = path.join(__dirname, `/config/.env_${process.env.SERVER}`);
require('dotenv').config({ path: envPath });
const express = require('express');
const cors = require('cors');
const swaggerDocs = require('./docs/SwaggerDocs');
const mobileSwaggerUI = require('swagger-ui-express');
const config = require('./config/config');
const routes = require('./routes');
const app = express();

app.use(express.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
}));
app.use(express.json({ limit: '50mb' }));

app.use(cors({ origin: true }));

app.use(config.APP_PREFIX, routes);

if (process.env.NODE_ENV == 'local') {
    app.use('/api-docs', mobileSwaggerUI.serve, mobileSwaggerUI.setup(swaggerDocs));
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerDocs);
    });
}

app.set('port', Number(process.env.PORT) || 8080);

module.exports = { app };
