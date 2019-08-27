
var config = {
    uri: 'mongodb://truongduchuy910:Truongduc910.@ds023593.mlab.com:23593/heroku_kg97w741'
}

var database = require('./modules/database')

var app = require('express')()


database.initialize(config, app)
require('./models/database').saveFileToStore('Mass6-so.png', (err, docs) => {
    console.log(docs)
})
app.listen(5000, () => console.log(`Listening on ${5000}`))
