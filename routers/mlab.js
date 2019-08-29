var database = require('../modules/mlab')
module.exports = function (app) {
    database.initialize()
    app
        .get('/store/:id', database.getStore)
}