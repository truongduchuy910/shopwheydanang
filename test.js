
var config = {
    uri: 'mongodb://truongduchuy910:Truongduc910.@ds023593.mlab.com:23593/heroku_kg97w741'
}

var database = require('./modules/database')
database.initialize(config)