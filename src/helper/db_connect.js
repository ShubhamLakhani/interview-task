const { Pool } = require('pg');
const { db_config } = require('../config/config');
const conn = new Pool(db_config);

conn.connect();

module.exports = { conn };
