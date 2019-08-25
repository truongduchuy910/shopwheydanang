var mongoose = require('mongoose');
module.exports = {
    initialize: function (config) {
        mongoose.connect(config.uri, { useNewUrlParser: true }, (err) => {
            if (!err) {
                console.log('connected to mongodb');
            }
        })
    }
}