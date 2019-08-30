var client = require('../modules/client')
module.exports = function (app) {
    app
        .get('/', client.home)
        .get('/detail/:id', client.detail)
        .get('/catalog/:id', client.check)
        .get('/post/:name', client.policy)

        .get('/getDetail/:id', client.getDetail)
}