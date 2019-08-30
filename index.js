//nodemon --exec "heroku local" --signal SIGTERM

const express = require('express')
const path = require('path')
const app = express();
const PORT = process.env.PORT || 5000 || 3333 || 2222
const bodyParser = require('body-parser')

var mongoose = require('mongoose');;

mongoose.connect(process.env.uri, { useNewUrlParser: true }, err => {
    if (!err) {
        console.log("database connected");
    }
});




app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

require('./routers/page')(app);
require('./routers/messenger')(app);

app.listen(PORT, () => console.log(`Listening on ${PORT}`))