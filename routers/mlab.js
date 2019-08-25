var database = require('../modules/mlab')
module.exports = function (app) {
    app
        .get('/store/:id', database.getStore)
}