var admin = require('../modules/admin')
var formidable = require('formidable')
module.exports = function (app) {
    app
        .get('/ad/banner', admin.banner)
        .get('/ad/detail', admin.detail)
        .get('/ad/login', admin.login)
        .get('/ad/news', admin.news)
        .get('/ad/product', admin.product)
        .get('/ad/search', admin.search)

        .post('/ad/saveProduct', admin.saveProduct)
}
function handPost(req, res, callback) {

}