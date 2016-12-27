const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

const {User} = require('./../server/models/user');

// this will remove ALL documents
// Todo.remove({}).then( (res) => {
//   console.log(res);
// });

// Todo.findOneAndRemove({_id: '5861a05039e04e0918491051'}).then( (todo) => {
//  console.log(todo);
// });

Todo.findByIdAndRemove('5861a05039e04e0918491050').then( (todo)=> {
  console.log(todo);
});
