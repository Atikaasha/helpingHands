// Set the 'development' environment configuration object
module.exports = {
	db: 'mongodb://localhost/mean-development',
	sessionSecret: 'developmentSessionSecret',
	facebook: {
		clientID: 'Facebook Application ID', //761643404790580
		clientSecret: 'Facebook Application Secret', //b2979565eda285c1b3048e7e3e8fff4d
		callbackURL: 'http://localhost:3000/oauth/facebook/callback',
		profileFields: ['id', 'email', 'name']
	},
	twitter: {
		clientID: 'Twitter Application ID',
		clientSecret: 'Twitter Application Secret',
		callbackURL: 'http://localhost:3000/oauth/twitter/callback'
	},
	google: {
		clientID: 'Google Application ID',
		clientSecret: 'Google Application Secret',
		callbackURL: 'http://localhost:3000/oauth/google/callback'
	}
};