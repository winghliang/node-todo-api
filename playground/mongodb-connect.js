// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// to create your own ObjectID anytime you want
// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    console.log('Unable to connect to MongoDB server');
  } else {
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //   text: 'Something to do',
    //   completed: false
    // }, (err, result) => {
    //   if (err) {
    //     // return is added only to stop execution if there's an error
    //     return console.log('Unable to insert todo', err);
    //   }
    //   console.log(JSON.stringify(result.ops, undefined, 2))
    // });

    // db.collection('Users').insertOne({
    //   name: 'Wing',
    //   age: 35,
    //   location: 'Los Altos'
    // }, (err, result) => {
    //   if (err) {
    //     return console.log('Unable to insert user', err);
    //   }
    //   console.log(result.ops[0]._id.getTimestamp());
    // });

    db.close();
  }
});
