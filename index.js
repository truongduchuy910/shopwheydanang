const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3000
var flash = require('connect-flash');
var session = require('express-session');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(session({ secret: 'xxxxxxxxxxxxx' }));
app.use(flash());

require('./routers/admin')(app)
require('./routers/client')(app)
require('./routers/mlab')(app)

app.get('/ad/*', function (req, res) {
    res.send('login???', 404);
});
app.get('*', function (req, res) {
    res.send('what???', 404);
});
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
