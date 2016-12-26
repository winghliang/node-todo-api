const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

const {User} = require('./../server/models/user');

// var id = '58618cd92c4b627107ead1ce';
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid')
// } else {
//   Todo.findById(id).then( (todo) => {
//     if (!todo){
//       return console.log('ID not found');
//     }
//     console.log('Todo By ID', todo);
//   }).catch( (e) => console.log(e) );
// }

// Todo.find({
//   _id: id
// }).then( (todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then( (todo) => {
//   console.log('Todo', todo);
// });

var userID = '585e0266ffd2de2eb9a84d1';

User.findById(userID).then( (user) => {
  if (!user) {
    return console.log('User not found')
  }
  console.log('User by ID:', user)
}).catch( (error) => console.log(error) );
