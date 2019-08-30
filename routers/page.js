//Models Schema Mongoose
const product = require("../models/product");
const event = require("../models/event");
const post = require("../models/post");
const description = require("../models/description");
const districts_GHN = require('../models/districts_GHN');
const cart = require('../models/cart');
const brand = require('../models/brand')
const analysis = require('../models/analysis')
const ms = require('../modules/API/messenge');
// Modules
const GHN = require('../modules/giaohangnhanh');
const user_messenger = require('../models/user_messenger');
module.exports = function (app) {
    app.post('/search', (req, res) => {
        var keyword = new RegExp(req.query.keyword, 'i');
        product.find({
            fullName: keyword
        },
            (err, docs) => {
                res.send(docs);
            })
    })
    app.post("/public/:event/:document/:field/:condition", (req, res) => {
        // Các component (ở mục ../views/partials) riêng lẻ gọi để truy cập database được truy cập public
        var database;
        switch (req.params.document) {
            case "event":
                database = event;
                break;
            case "description":
                database = description;
                break;
            case "post":
                database = post;
                break;
            case "product":
                database = product;
                break;
            case "districts_GHN":
                database = districts_GHN;
                break;
            case "brand":
                database = brand;
                break;
            default:
                res.send();
                break;
        }
        if (database) {
            var condition = JSON.parse(`{"${req.params.field}": "${req.params.condition}"}`);
            if (req.params.condition == 'null') condition = {};
            database.find(
                condition,
                (err, docs) => {
                    res.send({
                        event: req.params.event,
                        data: docs
                    });
                }
            )
        }
    })
    app.post('/order/:name/:phone/:province/:district/:address/:total', (req, res) => {
        var data = req.body;
        count = 0;
        var elements = [];
        var saveelements = []
        var haveError = true;
        while (data[`elements[${count}][title]`]) {
            console.log(Number(data[`elements[${count}][quantity]`]));
            if (Number(data[`elements[${count}][quantity]`]) == 0) {
                console.log('have error')
                haveError = false;
            }
            var item = {
                title: data[`elements[${count}][title]`],
                subtitle: data[`elements[${count}][subtitle]`],
                quantity: data[`elements[${count}][quantity]`],
                price: data[`elements[${count}][price]`],
                currency: data[`elements[${count}][currency]`],
                image_url: data[`elements[${count}][image_url]`],
            }
            elements.push(item)
            var item = {
                id: data[`elements[${count}][id]`],
                code: data[`elements[${count}][code]`],
                title: data[`elements[${count}][title]`],
                subtitle: data[`elements[${count}][subtitle]`],
                quantity: data[`elements[${count}][quantity]`],
                price: data[`elements[${count}][price]`],
                currency: data[`elements[${count}][currency]`],
                image_url: data[`elements[${count}][image_url]`],
            }
            saveelements.push(item)
            count++;
        }
        if (haveError) {

            var date = new Date();
            date.getTime();

            var new_cart = new cart;
            new_cart.date = date;
            new_cart.name = req.params.name;
            new_cart.phone = req.params.phone;
            new_cart.province = req.params.province;
            new_cart.district = req.params.district;
            new_cart.address = req.params.address;
            new_cart.total = req.params.total;
            new_cart.products = saveelements;
            new_cart.save((err, new_product) => {
                res.send({ mess: `Cảm ơn ${new_product.name} đã đặt hàng. Mã đơn hàng của bạn là ${new_product._id}` });
                user_messenger.find({
                    role: 'admin'
                }, (err, docs) => {
                    var message = {
                        "attachment": {
                            "type": "template",
                            "payload": {
                                "template_type": "receipt",
                                "recipient_name": new_product.name,
                                "order_number": new_product._id.toString(),
                                "currency": "USD",
                                "payment_method": "Visa 2345",
                                "order_url": "http://quantri.loaloa.me",
                                "timestamp": "1428444852",
                                "address": {
                                    "street_1": new_product.address,
                                    "street_2": "",
                                    "city": req.params.district,
                                    "state": req.params.province,
                                    "postal_code": "5600",
                                    "country": "VN"
                                },
                                "summary": {
                                    "total_cost": new_product.total.toString()
                                },
                                "adjustments": [
                                ],
                                "elements": elements
                            }
                        }
                    }
                    console.log(message.attachment.payload.elements);

                    docs.forEach(user => {
                        ms.send(user.PSID, message, (err, docs) => {
                            console.log(err, docs);
                        })
                    })
                })
            });


        } else {
            res.send({ mess: `Đã xảy ra lỗi, bạn vui lòng xem lại trong hóa đơn có sản phẩm nào đã hết hàng không. Hoặc liên hệ với chúng tôi` });
        }
    })
    app.get('/', (req, res) => {
        post.find({}, (err, docs) => {
            res.render('pages/index', { post: docs });

        })
    })
    app.get('/search', (req, res) => {
        res.render('pages/search');
    })
    app.get('/brand', (req, res) => {
        res.render('pages/brand');
    })
    app.get('/cart', (req, res) => {
        res.render('pages/cart');
    })
    app.get("/bai-viet/:name", (req, res) => {
        event.findOne({
            html: req.params.html
        }, (err, docs) => {
            res.render("pages/post", docs);
        })
    })
    app.get("/su-kien/:name", (req, res) => {
        res.render("pages/event");
    })

    app.get("/san-pham/:name", (req, res) => {
        res.render("pages/product");
    })

    app.get("/san-pham", (req, res) => {
        res.render('pages/index');

    })

    app.get('/danh-muc/:name', (req, res) => {
        product.findOne({
            category_html: req.params.name
        }, (err, docs) => {
            var categoryName;
            if (docs && docs.categoryName) categoryName = docs.categoryName
            res.render("pages/category", { categoryName: categoryName });
        })
    })
    app.post('/analysis/:type/:content', (req, res) => {
        analysis.insertMany({
            type: req.params.type,
            content: req.params.content,
            date: Date()
        }, (err, docs) => {
        })
    })
}