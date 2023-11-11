const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const loginRoute = require('./routes/login.route');

// body parser was used to get the form data from ejx file
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// set the view engine to ejs
app.set('views', './pages');
app.set('view engine', 'ejs');

// session initialization
app.use(session({
    secret: uuidv4(), //  '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    resave: false,
    saveUninitialized: true
}));

app.use('/', loginRoute);

const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server Started at Port Number ${PORT}`);
})
