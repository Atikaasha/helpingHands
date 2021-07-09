const passport = require('passport');
const mongoose = require('mongoose');
const { param } = require('../server.js');
//handling user serialization
module.exports = function () {
    const User = mongoose.model('User');
    //authenticated user must be serialized to the session (just the user id)
    passport.serializeUser(function (user, done) { done(null, user.id); });
    //deserialize when requests are made
    passport.deserializeUser(function (id, done) {
        User.findOne({ _id: id },
            '-password -salt', 
            function (err, user) { done(err, user); });
    });
    require('./strategies/local.js')(); //include the local strategy config file
};