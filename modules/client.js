module.exports = {
    home: function (req, res) {
        res.render('pages/home')
    },
    product: function (req, res) {
        res.render('pages/product')
    },
    check: function (req, res) {
        res.render('pages/check')
    },
    policy: function (req, res) {
        res.render('pages/policy')
    },
}