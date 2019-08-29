var admin = require('../modules/admin')
var formidable = require('formidable')
var fs = require('fs')
module.exports = function (app) {
    admin.initialize(app)
    app
        .get('/ad/login', admin.login)
        .get('/ad/login-require', admin.loginRequire)
        .get('/logout', admin.logout)
        .post('/ad/login', admin.localLogin)


        .get('/ad/banner', isAd, admin.banner)
        .get('/ad/detail/:id', isAd, admin.detail)
        .get('/ad/post', isAd, admin.post)
        .get('/ad/product', isAd, admin.product)
        .get('/ad/search', isAd, admin.search)

        .post('/ad/saveProduct', isAd, handPost, admin.saveProduct)
        .get('/ad/removeProduct/:id', isAd, handPost, admin.removeProduct)
        .post('/ad/updateName/:id', isAd, handPost, admin.updateName)
        .post('/ad/updatePrice/:id', isAd, handPost, admin.updatePrice)
        .post('/ad/updateSale/:id', isAd, handPost, admin.updateSale)
        .post('/ad/updateImage/:id', isAd, handPost, admin.updateImage)

        .post('/ad/saveAttribute/:id/:name', isAd, handPost, admin.saveAttribute)
        .get('/ad/removeAttribute/:id/:attrId', isAd, admin.removeAttribute)

        .post('/ad/saveProductAttribute/:id/:name', isAd, admin.saveProductAttribute)
        .post('/ad/removeProductAttribute/:id/:name', isAd, admin.removeProductAttribute)

        .post('/ad/saveProductInfomation/:id/:name', isAd, admin.saveProductInfomation)
        .post('/ad/uploadBanner/:name', isAd, handPost, admin.uploadBanner)
        .post('/ad/savePostInfomation/:pointName/:infName', isAd, admin.savePostInfomation)
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

function isAd(req, res, next) {
    if (req.isAuthenticated()) {
        return next();

    } else {
        console.log('chưa đăng nhập')
        res.redirect('/ad/login-require');
    }
}