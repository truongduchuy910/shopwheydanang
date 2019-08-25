var client = require('../modules/client')
module.exports = function (app) {
    app
        .get('/', client.home)
        .get('/product', client.product)
        .get('/check', client.check)
        .get('/policy', client.policy)
}