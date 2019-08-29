var admin = require('../modules/admin')
var formidable = require('formidable')
var fs = require('fs')
module.exports = function (app) {
    app
        .get('/ad/banner', admin.banner)
        .get('/ad/detail/:id', admin.detail)
        .get('/ad/login', admin.login)
        .get('/ad/post', admin.post)
        .get('/ad/product', admin.product)
        .get('/ad/search', admin.search)

        .post('/ad/saveProduct', handPost, admin.saveProduct)
        .get('/ad/removeProduct/:id', handPost, admin.removeProduct)
        .post('/ad/updateName/:id', handPost, admin.updateName)
        .post('/ad/updatePrice/:id', handPost, admin.updatePrice)
        .post('/ad/updateSale/:id', handPost, admin.updateSale)
        .post('/ad/updateImage/:id', handPost, admin.updateImage)

        .post('/ad/saveAttribute/:id/:name', handPost, admin.saveAttribute)
        .get('/ad/removeAttribute/:id/:attrId', admin.removeAttribute)

        .post('/ad/saveProductAttribute/:id/:name', handPost, admin.saveProductAttribute)
        .post('/ad/removeProductAttribute/:id/:name', handPost, admin.removeProductAttribute)

        .post('/ad/saveProductInfomation/:id/:name', handPost, admin.saveProductInfomation)
        .post('/ad/uploadBanner/:name', handPost, admin.uploadBanner)
        .post('/ad/savePostInfomation/:pointName/:infName', handPost, admin.savePostInfomation)
}
function handPost(req, res, next) {
    var form = new formidable.IncomingForm()
    var path = `./public/upload/${Math.floor(Math.random() * Math.floor(999999999999)).toString()}`
    fs.mkdir(path, { recursive: true }, (err) => {
        if (err) {
            throw err
        } else {
            form.uploadDir = path
            form.keepExtensions = true
            form.maxFieldsSize = 3 * 1024 * 1024
            form.maxFieldsSize = 3 * 1024 * 1024
            form.parse(req, function (err, fields, files) {
                if (err) {
                }
                else {
                    fs.readdir(path, (err, files) => {
                        if (err) {
                        } else {
                            req.body = {
                                fields: fields,
                                files: files,
                                path: path
                            }
                            next()
                        }
                    })
                }
            })
        }
    })
}