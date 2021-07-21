var users = require('../../app/controllers/users.server.controller'),
    passport = require('passport');
module.exports = function (app) {
    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);
    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/',
            failureFlash: true
        }));
    app.get('/signout', users.signout);
    app.param('_id', users.findUserById);
    app.route('/userProfile/:_id').get(users.readProfile);
    app.route('/editProfile/:_id').get(users.read).put(users.update);
};
