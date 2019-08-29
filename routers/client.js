var client = require('../modules/client')
module.exports = function (app) {
    app
        .get('/', client.home)
        .get('/detail', client.product)
        .get('/catalog', client.check)
        .get('/post', client.policy)
}