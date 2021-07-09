// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the module dependencies
const configureMongoose = require('./config/mongoose');
const configureExpress = require('./config/express');
const configurePassport = require('./config/passport');


//const mongoose = require('mongoose');


// Create a new Mongoose connection instance
const db = configureMongoose();
const port = process.env.PORT || 3000;
// Create a new Express application instance
const app = configureExpress();

const passport = configurePassport();

//mongoose.connect('mongodb+srv://admin:admin@cluster0.j7y8s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
//,{ useUnifiedTopology: true }, ()=> console.log("Connected to cloude DB!"));
// Use the Express application instance to listen to the '3000' port
app.listen(port);

// Log the server status to the console
console.log('Server running at port '+ port);

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;