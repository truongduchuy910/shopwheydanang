
var config = {
    uri: 'mongodb://truongduchuy910:Truongduc910.@ds023593.mlab.com:23593/heroku_kg97w741'
}

var database = require('./modules/database')
database.initialize(config)
database.banner.find({}, (err, docs) => {
    console.log(docs)
})
var app = require('express')()
app.get('/', (req, res) => {
    res.send('OK')
})
app.listen(5000, () => console.log(`Listening on ${5000}`))
