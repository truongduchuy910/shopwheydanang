const marketing = require("../models/marketing");
const event = require("../models/event");
const post = require("../models/post");
const product = require("../models/product");
const description = require("../models/description");
const districts_GHN = require('../models/districts_GHN');
module.exports = function (app) {
    //Database Query
    app.post("/public/:event/:document/:field/:condition", (req, res) => {
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
    app.post('/addorder')
    app.post("/component/category", (req, res) => {

        event.find({
            type: "event"
        }, (err, product) => {
            res.send(product);
        })

    })

    app.post("/component/flash_sale", (req, res) => {
        event.findOne(
            {
                type: "FlashSale"
            },
            (err, event) => {
                if (event) {
                    product.find({
                        event: "Flash Sale"
                    }, (err, product) => {
                        res.send({
                            event: event,
                            product: product
                        });
                    })
                } else {
                    res.send(null);
                }
            }
        )
    })

    app.post("/component/post_today", (req, res) => {
        post.findOne(
            {
                type: "daily"
            },
            (err, docs) => {
                res.send(docs);
            }
        )
    })

    app.post("/component/top_sale", (req, res) => {

        product.find({
            topSale: true
        }, (err, product) => {
            res.send(product);
        })

    })

    app.post('/page/danh-muc/:name', (req, res) => {
        product.find(
            {
                htmlCategoryName: req.params.name
            }, (err, docs) => {
                if (docs) {
                    var categoryName;
                    if (docs[0] && docs[0].categoryName) {
                        categoryName = docs[0].categoryName;
                    }
                    res.send({
                        categoryName: categoryName,
                        product: docs
                    });
                } else {
                    res.send(null);
                }
            }
        )

    })

}