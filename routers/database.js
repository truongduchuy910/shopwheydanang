var database = require('./modules/database')
module.exports = function (app) {
    app
        .get('/store/:id', database.setStore)
}