module.exports = {
    banner: function (req, res) {
        res.render('admin/pages/banner', {
            active: {
                banner: "active"
            },
            banners: {

            }
        })
    },
    detail: function (req, res) {
        res.render('admin/pages/detail/:id', {
            active: {
                detail: "active"
            },
            product: {}
        })
    },
    login: function (req, res) {
        res.render('admin/pages/login')
    },
    news: function (req, res) {
        res.render('admin/pages/news', {
            active: {
                news: "active"
            }
        })
    },
    product: function (req, res) {
        res.render('admin/pages/product', {
            active: {
                product: "active"
            },
            products: {}
        })
    },
    search: function (req, res) {
        res.render('admin/pages/search', {
            active: {
                search: "active"
            },
            products: {}
        })
    },
    saveProduct: function (req, res) {
        var data = req.query
        console.log(data)
        res.send()
    }
}
