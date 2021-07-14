const Service = require('mongoose').model('Service');
const User = require('mongoose').model('User');
const session = require('express-session');

exports.display = function(req, res) {
    Service.find({status: 'Requested'}, function(err, bookings){
        if(err){
            return next(err);        
        }else{
            //console.log("Available bookings: "+bookings)
        }
    }).populate('customer').exec((err, customers)=>{
        //console.log(`Populated: `, customers)
        res.render(
            "availableBookings", {
                title: 'Available Requests',
                customers: customers, 
        });
    })
  };

  exports.findServiceById = function (req, res, next, _id) {
    Service.findOne({
        _id: _id 
    }, (err, service) => {
        if (err) {
            
            return next(err);
        } else {
            //console.log(service)
            req.service = service;
            session.service = service;
            next();
        }
    });
};

  exports.serviceByServiceId = function (req, res, next){
    req.service = session.service;
        var jsonService = JSON.parse(JSON.stringify(req.service));
        res.render('acceptedBookings', { title: 'Accepted Bookings', booking: jsonService} );
};

exports.update = function (req, res, next) {
    var serviceProvider = session.userFullName;
    var username = session.userName;
    console.log(username);
    req.serviceProvider = User.findOne({ username: username }, (err, user) => {
        if (err) { return getErrorMessage(err); }
        req.id = user._id;
        userFullName = user.fullName;
        serviceProvider = userFullName;
        //console.log(req.id);
    });
    Service.findByIdAndUpdate(
        { _id: req.service._id },
        { status: "Accepted", serviceProvider:  serviceProvider, },
        function(err, result) {
          if (err) {
            res.send(err);
          } else {
            console.log("Update in action");
            //res.redirect('/acceptedBookings');
            console.log(req.service);
          }
        }
      );
      User.findByIdAndUpdate(
        { _id: req.service.customer._id },
        { notification: req.service.serviceType+" request accepted by "+ serviceProvider },
        function(err, result) {
          if (err) {
            res.send(err);
          } else {
            console.log("Update in action");
            res.redirect('/acceptedBookings');
          }
        }
      );
};

     //List of all bookings accepted by a service provider
     exports.bookingsAcceptedByProvider = function (req, res, next) {
        var userName = session.userName;
        console.log("Cleaner: " +userName);
        User.
            findOne({ serviceProvider: session.userFullName }, (err, user) => {
                if (err) { return getErrorMessage(err); }
                console.log(req.id);
            }).then(function () {
                Service.
                    find({
                        serviceProvider: session.userFullName
                    }, (err, bookings) => {
                        if (err) { return getErrorMessage(err); }
                    }).populate('customer').exec((err, bookings)=>{
                        //console.log(`Populated: `, customers)
                        res.render(
                            "acceptedBookings", {
                            title: 'Accepted Tasks',
                            userFullName: session.userFullName,
                            bookings: bookings
                        });
                    });
            });
    };
