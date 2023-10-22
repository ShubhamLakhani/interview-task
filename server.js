const { app } = require('./src/app');

app.listen(app.get('port'), '0.0.0.0', function () {
    console.log('App ' + process.env.NODE_ENV + ' started on Port No.', app.get('port'));
});