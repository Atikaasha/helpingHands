const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');
//Register the strategy 
module.exports = function () {
    passport.use(new LocalStrategy(function (username, password, done) {
        //find a user with that username and authenticate it
        User.findOne({ username: username }, (err, user) => {
            if (err) { // if an exception occurred while verifying the credentials 
                return done(err); //done is a Passport function
            }
            if (!user) { //if user is not valid 
                return done(null, false, { message: 'Unknown user' });
            }
            if (!user.authenticate(password)) { //if password is incorrect
                return done(null, false, { message: 'Invalid password' });
            }
            return done(null, user); // user is authenticated
        });
    }));
};

