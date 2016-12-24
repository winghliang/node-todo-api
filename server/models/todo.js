var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true // removes leading or trailing white spaces
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    // will be a unix timestamp, which is a number
    type: Number,
    default: null
  }
});

module.exports = {Todo};
