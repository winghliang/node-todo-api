// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    console.log('Unable to connect to MongoDB server');
  } else {
    console.log('Connected to MongoDB server');

    // db.collection('Todos').find({
    //   _id: new ObjectID('585c3a0c59f8ddc88a4865ce')
    // }).toArray().then( (docs) => {
    //   console.log('Todos');
    //   console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //   console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find().count().then( (count) => {
    //   console.log(`Todos count: ${count}`);
    // }, (err) => {
    //   console.log('Unable to fetch count', err);
    // });

    db.collection('Users').find({name: 'Ellie'}).toArray().then( (users) => {
      console.log('Returned User(s):');
      console.log(JSON.stringify(users, undefined, 2));
    }, (err) => {
      console.log('Unable to find user');
    });

    // db.close();
  }
});
