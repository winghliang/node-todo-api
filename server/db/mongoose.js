var mongoose = require('mongoose');

// use built-in promise library
mongoose.Promise = global.Promise;

// OLD CODE: this used to pick the MongoDB URI based on whether the Heroku enviroment is running
// if Heroku environment is running, connection will be to the first part and second doesn't execute
// otherwise, the first fails and the second executes
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};
