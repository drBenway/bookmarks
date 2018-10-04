
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser  = bodyParser.json();
let app = express();
app.set('view engine', 'ejs');

// For the database
let sqlite3 = require('sqlite3');
let db = new sqlite3.Database('./bookmark.sqlite');

// serve static files
app.use(express.static( __dirname +'/static'));

// overview pages
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/overview.html');
});

// api/bookmarks

require('./Controllers/Bookmarks')(app,db,jsonParser);

require('./Controllers/Screenshots')(app);

app.listen(3000, () => console.log(' app listening on port 3000!'));

