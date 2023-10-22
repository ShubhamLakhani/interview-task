const { conn } = require('./db_connect');


function query(query, value = []) {
    return new Promise((resolve) => {
        try {
            conn.query(query, value, function (errs, query_resource_obj) {
                if (errs) {
                    console.log(errs, query);
                    resolve(false);
                } else {
                    resolve(query_resource_obj);
                }
            });
        } catch (error) {
            resolve(false);
        }
    });
}


module.exports = {
    query
};
