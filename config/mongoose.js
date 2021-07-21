// Load the module dependencies
const config = require('./config');
const mongoose = require('mongoose');

// Define the Mongoose configuration method
module.exports = function() {
	mongoose.set('returnOriginal', false);
	// Use Mongoose to connect to MongoDB
	//const db = mongoose.connect(config.db);
	

	//user mongodb cloud
	const db = mongoose.connect("mongodb+srv://ccc_user_16:Cccner123@cluster0.tzmwn.mongodb.net/occ_data?retryWrites=true&w=majority", {
	//const db = mongoose.connect("mongodb+srv://admin:admin@cluster0.j7y8s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {

		useUnifiedTopology: true,
		useNewUrlParser: true, useCreateIndex: true 
		}).then(() => console.log('Cloud DB Connected!'))
		.catch(err => {
		console.log('Error');
		});

	// Load the 'User' model 
	require('../app/models/user.server.model');
	// Load the 'Service' model 
	require('../app/models/service.server.model');

	// Return the Mongoose connection instance
	return db;
};
