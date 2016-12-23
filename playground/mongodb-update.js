// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    console.log('Unable to connect to MongoDB server');
  } else {
    console.log('Connected to MongoDB server');

    // db.collection('Todos').findOneAndUpdate({
    //   _id: new ObjectID('585c9c1cdd5873379d793778'),
    // }, {
    //   $set: {
    //     completed: true
    //   }
    // }, {
    //   returnOriginal: false
    // }).then((result) => {
    //   console.log(result)
    // });

    db.collection('Users').findOneAndUpdate({
      _id: new ObjectID('585b5add6ad7c26626d77c2f'),
    }, {
      $set: {
        name: 'Wing'
      },
      $inc: {
        age: 1
      }
    }, {
      returnOriginal: false
    }).then((result)=>{
      console.log(result);
    });

    // db.close();
  }
});
