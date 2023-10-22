const config = {
    'MODE': process.env.SERVER,
    'db_config': {
        'host': process.env.db_host,
        'user': process.env.db_user,
        'password': process.env.db_password,
        'database': process.env.db_database,
        'debug': (process.env.debug == 'true'),
        'waitForConnections': (process.env.waitForConnections == 'true'),
        'queueLimit': process.env.queueLimit,
        'multipleStatements': (process.env.multipleStatements == 'true'),
        'charset': process.env.charset
    },
    'APP_PREFIX': process.env.SITE_PREFIX,
    'DEF_LIMITED_ID': '86118093,86696489,88186467',
};

module.exports = config;
