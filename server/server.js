var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

// middleware that allows us to send json to our express application
// the return value of bodyParser.json() is the middleware function
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then( (doc)=>{
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then( (todos) => {
    // send todos in an object so that we can add more key/value pairs later if needed
    // such as a status code
    res.send({todos});
  }, (err) => {
    res.status(400).send({});
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findById(id).then( (todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }, (err) =>{
    res.status(400).send();
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

module.exports = {app};
