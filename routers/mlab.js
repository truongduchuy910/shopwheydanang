var database = require('../modules/mlab')
module.exports = function (app) {
    database.initialize(app)
    app
        .get('/store/:id', database.getStore)
}