module.exports = {
    banner: function (req, res) {
        res.render('admin/pages/banner')
    },
    detail: function (req, res) {
        res.render('admin/pages/detail')
    },
    login: function (req, res) {
        res.render('admin/pages/login')
    },
    news: function (req, res) {
        res.render('admin/pages/news')
    },
    product: function (req, res) {
        res.render('admin/pages/product')
    },
    search: function (req, res) {
        res.render('admin/pages/search')
    },
}