// const {SHA256} = require('crypto-js');

const jwt = require('jsonwebtoken');

// var message = "I am user no. 1";
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data: data,
//   hash: SHA256(JSON.stringify(data) + 'some_secret_salt').toString()
// }
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret_secret_salt').toString();
//
// if (resultHash === token.hash) {
//   console.log('Data was not changed')
// } else {
//   console.log('Data was changed.  Do not trust!')
// }

var data = {
  id: 10
};

var token = jwt.sign(data, 'some_secret_salt'); // second argument is the salt
console.log(token);

var decoded = jwt.verify(token, 'some_secret_salt');
console.log('Decoded: ', decoded);
