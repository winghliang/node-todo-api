const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// refactoring to use a UserSchema will allow us to create custom schema methods
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

// override toJSON method so that only certain fields get converted to JSON
UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

// use a regular function in order to bind the "this" keyword
UserSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  var token = jwt.sign({
    _id: user._id.toHexString(),
    access: access
  }, 'some_secret_salt').toString();

  user.tokens.push({access, token});

  // return in order to allow server.js to chain on to the promise
  return user.save().then( ()=>{
    // return the token so that later on, in the server file we can tack on another "then" callback
    return token;
  })
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};
