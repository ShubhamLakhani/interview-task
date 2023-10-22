'use strict';
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const verifyToken = (req, res, next) => {
    try {
        if (req.method !== 'OPTIONS') {
            if (req.headers?.['access-token']) {
                let decode_data = jwt.decode(req.headers['access-token']);

                if (decode_data) {
                    res.locals.decoded_role = decode_data?.role ?? '3';
                    res.locals.decoded_name = decode_data?.name ?? 'Limited';

                    next();
                } else {
                    return res.status(400).json({ status: 'UNAUTHORIZED' });
                }
            } else {
                return res.status(400).json({ status: 'UNAUTHORIZED' });
            }
        } else {
            next();
        }
    } catch (error) {
        return res.status(400).json({ status: 'UNAUTHORIZED' });
    }

};
module.exports = verifyToken;