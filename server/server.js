require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT;

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

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch( (error) =>{
    res.status(400).send();
  });

});

app.patch('/todos/:id', (req, res) =>{
  var id = req.params.id;
  // use lodash to pull of just the properties that we want the user to update
  // the user might pass in additional properties or properties we don't want updated (e.g., completedAt)
  // so we use the lodash pick method to limit what is pulled off
  var body = _.pick(req.body, ['text', 'completed']);
  console.log(body);

  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then( (todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });

});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  var user = new User(body);

  user.save().then( () => {
    return user.generateAuthToken();
  }).then( (token) => {
    res.header('x-auth', token).send(user); // x in the header means a custom header
  })
  .catch( (e) => {
    res.status(400).send(e);
  });

});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = {app};
