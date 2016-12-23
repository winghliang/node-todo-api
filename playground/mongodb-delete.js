// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    console.log('Unable to connect to MongoDB server');
  } else {
    console.log('Connected to MongoDB server');

    // deleteMany
    // db.collection('Users').deleteMany({name: 'Wing'}).then((result) => {
    //   console.log(result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'eat lunch'}).then((result) => {
    //   console.log(result);
    // });

    // findOneAndDelete
    db.collection('Users').findOneAndDelete({_id: new ObjectID('585ca1d6dd5873379d793974')}).then((result) => {
      console.log(JSON.stringify(result, undefined, 2));
    });

    // db.close();
  }
});
