// set up ===================================
var express = require('express')
  , app = express()
  , mongoose = require('mongoose')
  , morgan = require('morgan')       // log requests to the console (express4)
  , bodyParser = require('body-parser')  // pull information from HTML POST (express4)
  , methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =============================

mongoose.connect('mongodb://localhost:27017/angular-app');

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");


// define model =================
var Contact = mongoose.model('Contact', {
  date_created: Date,
  isActive: Boolean,
  balance: String,
  birth_date: String,
  first_name: String,
  last_name: String,
  company: String,
  email: String,
  phone: String
});

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all contacts
app.get('/api/contacts', function(req, res) {

  // use mongoose to get all contacts in the database
  Contact.find(function(err, contacts) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
      res.send(err)

    res.json(contacts); // return all contacts in JSON format
  });
});

// get one contact
app.get('/api/contacts/:id', function(req, res) {

  // use mongoose to get all contacts in the database
  Contact.find({_id: req.params.id}, function(err, contact) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
      res.send(err)

    res.json(contact); // return all contacts in JSON format
  });
});




// create contact and send back all contacts after creation
app.post('/api/contacts', function(req, res) {
  console.log(req.body);
  // create a contact, information comes from AJAX request from Angular
  Contact.create(req.body, function(err, contact) {
    if (err)
      res.send(err);

    // get and return all the contacts after you create another
    Contact.find(function(err, contacts) {
      if (err)
        res.send(err)
      res.json(contacts);
    });
  });

});

// update contact and send back all contacts after creation
app.put('/api/contacts/:id', function(req, res) {
  console.log(req.body);
  // create a contact, information comes from AJAX request from Angular
  Contact.update({_id: req.params.id}, req.body, function(err, contact) {
    if (err)
      res.send(err);

    // get and return all the contacts after you create another
    Contact.find(function(err, contacts) {
      if (err)
        res.send(err)
      res.json(contacts);
    });
  });

});