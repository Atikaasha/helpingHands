// Load the module dependencies
const config = require('./config');
const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

// Define the Express configuration method
module.exports = function() {
	// Create a new Express application instance
	const app = express();
	app.use(methodOverride());
    app.use(methodOverride('_method'));

	// Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	// Use the 'body-parser' and 'method-override' middleware functions
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	//app.use(methodOverride());

	// Configure the 'session' middleware
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	// Set the application view engine and 'views' folder
	app.set('views', './app/views');
	app.set('view engine', 'ejs');
	app.engine('html', require('ejs').renderFile);

	app.use(flash());

	app.use(passport.initialize()); //bootstrapping the Passport module
	app.use(passport.session()); //keep track of your user's session

	// Load the routing files
	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);
	require('../app/routes/service.server.routes.js')(app);
	require('../app/routes/provider.server.routes.js')(app);
	// Configure static file serving
	app.use(express.static('./public'));
	app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

	// Return the Express application instance
	return app;
};