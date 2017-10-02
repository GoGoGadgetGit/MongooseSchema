const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Action = require('./models/action.js')

const express = require('express');
const mustache = require('mustache-express');
const session = require('express-session');
const bodyparser = require('body-parser');


const server = express();
server.use(bodyparser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/figure');

server.engine('mustache', mustache());
server.set('views', './views')
server.set('view engine', 'mustache');

// var action = new Action({name: "Sahara"});
// action.appearedIn.push({comic: 2});

// Action.create({name: "Beyond"})
// .then(function() {

// })
// .catch(function(err) {
// console.log(err);
// })

server.post('/add', function(req, res) {
  const query = req.body.new;

  Action.create({name : query}).then(function(list){
    res.redirect('/');
  })
   
  // put the code that adds stuff to the db here
// console.log(action.toObject());
});

server.post('/delete/:id', function(req, res) {
  const minus = req.params.id;

  Action.remove({_id : minus}).then(function(list){
    res.redirect('/');
  })
 
});

server.post('/edit/:id', function(req, res) {
  const change = req.params.id;
  const query = req.body.change;

  Action.update({_id : change},{name : query}).then(function(list){
    res.redirect('/');
  })
 
});

server.get('/', function (req, res) {
  Action.find({}).then(function(list){
    res.render('home', {
      figures : list
    });
  })
 
});


server.listen(3000, function () {
  console.log('Punch! Zonk! Ka-blooey!')
});


// look up how to update records in mongoose schema
// need id of what is being edited
// make sure edit textbox has name of new just like original input text box