var client = require('../modules/client')
module.exports = function (app) {
    app
        .get('/', client.home)
        .get('/detail/:id', client.detail)
        .get('/catalog/:id', client.catalog)
        .get('/post/:pointName', client.post)
        .get('/search', client.search)

        .get('/getDetail/:id', client.getDetail)
        .get('/getProductByAttribute/:id', client.getProductByAttribute)
        //.get('/search', client.search)
}
