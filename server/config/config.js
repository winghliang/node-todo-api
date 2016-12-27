// set environment variable
// if Heroku is running, process.env.NODE_ENV would exist;
// if we are running tests, package.json would set process.env.NODE_ENV to 'test'
// if Heroku not running, it will not, and env will be set to development
var env = process.env.NODE_ENV || 'development';
console.log('env ******', env);

// If the environment is either development or test (as opposed to Heroku), set to port 3000 & the mongo database URI
if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
