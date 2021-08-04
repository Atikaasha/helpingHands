const session = require('express-session');
exports.render = function (req, res) {
	res.render('index', {
		title: 'Home',
		userCategory: req.user? req.user.category : '',
		userFullName: req.user ? req.user.fullName : '',
		username: req.user? req.user.username : '',
		userId: req.user? req.user._id : '',
		notification: req.user? req.user.notification : '',
		email: req.user? req.user.email : '',
		messages: req.flash('error') || req.flash('info')
	});
	session.userName = req.user? req.user.username: '';
	session.userFullName = req.user? req.user.fullName: '';
	//console.log('User email: '+req.user? req.user.email: '');
};

const getErrorMessage = function(err) {
	// Define the error message variable
	var message = '';

	// If an internal MongoDB error occurs get the error message
	if (err.code) {
		switch (err.code) {
			// If a unique index error occurs set the message error
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			// If a general error occurs set the message error
			default:
				message = 'Something went wrong';
		}
	} else {
		// Grab the first error message from a list of possible errors
		for (const errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	// Return the message error
	return message;
};

exports.about = function (req, res) {
	res.render('about', {
		title: 'About'
	});
	session.userName = req.user? req.user.username: '';
	session.userFullName = req.user? req.user.fullName: '';
	//console.log('User email: '+req.user? req.user.email: '');
};
