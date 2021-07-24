const session = require('express-session');
var Customer = require('mongoose').model('User');
var Service = require('mongoose').model('Service');

exports.customerByUserName = function (req, res, next) {
    req.user = req.body //read the user from request's body
    // Use the 'User' static 'findOne' method to retrieve a specific user
    var username = session.userName;
    //console.log("Username: "+ username);
    Customer.findOne({
        username: username //finding a document by username
    }, (err, user) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Set the 'req.user' property
            req.user = user;
            session.user = user;
            session.userId = user._id;
            session.userFirstName = user.firstName;
            //parse it to a JSON object
            var jsonUser = JSON.parse(JSON.stringify(user));
            //console.log(jsonUser);
            //display edit page and pass user properties to it
            res.render('bookService', { title: 'Book a service', user: jsonUser} );
            // Call the next middleware
            next();
        }
    });
};

exports.completeBookingService = function (req, res) {
    var username = session.userName;
     // Create a new instance of the 'Comment' Mongoose model
     //var comment = new Comment(req.body); //get data from ejs page and attaches them to the model
     var service = new Service({
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
        city: req.body.city,
        province: req.body.province,
        postalCode: req.body.postalCode,
        serviceType: req.body.serviceType,
        serviceDate: req.body.serviceDate,
        client: session.user });
        //console.log("Customer id: "+ session.userId);
     service.save(function (err) {
        
         if (err) {
             // Call the next middleware with an error message
             return next(err);
         } else {
             // Use the 'response' object to send a JSON response
             res.render('thanks', {
                 title: 'Thank You',  
                 userFullName : session.userFullName,
                 address: req.body.addressLine1 + ", " + req.body.addressLine2
                 + ", " + req.body.city + ", " + req.body.province + ", " + req.body.postalCode,
                date: req.body.serviceDate,
                username : username,
                status: service.status                              
             });          
         }
     });
     console.log("Just created: "+ service)
};

     //List of all bookings by a customer
     exports.bookingsByCustomer = function (req, res, next) {
        var username = session.userName;
        //console.log(username);
        //find the student then its comments using Promise mechanism of Mongoose
        Customer.
            findOne({ username: username }, (err, user) => {
                if (err) { return getErrorMessage(err); }
                req.id = user._id;
                userFullName = user.fullName;
                //console.log(req.id);
            }).then(function () {
                //find the posts from this author
                Service.
                    find({
                        client: req.id
                    }, (err, bookings) => {
                        if (err) { return getErrorMessage(err); }
                        //res.json(comments);
                        res.render('customerBookings', {
                            title: 'Bookings',
                            userFullName: userFullName,
                            bookings: bookings,
                        });
                        console.log("Booking details " + bookings);
                    });
            });
    };

    exports.read = function(req, res) {
        //var updatedService = req.service;
        console.log('In-read'+ req.service);
        res.json(req.service);
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

    exports.editBooking = function (req, res, next){
        req.service = session.service;
            var jsonService = JSON.parse(JSON.stringify(req.service));
            res.render('editBooking', { title: 'Edit Service', booking: jsonService} );
            console.log("In editBooking");
    };

    exports.update = function (req, res, next) {
        req.service=req.service //read the service from request's body
        console.log("Update Booking: "+ req.service._id);
        //Use the 'User' static 'findByIdAndUpdate' method to update a specific user
        Service.findByIdAndUpdate(req.service._id, req.body, (err, service) => {
            if (err) {
                // Call the next middleware with an error message
                return next(err);
            } else {
                if(session.userName != 'Admin'){
                    res.redirect('/customerBookings')
                }     
                else{
                    res.redirect('/admin/allBookings')
                }                      
            }
        })
    };
    exports.deleteByServiceId = function (req, res, next) {
        //
        console.log("Service Id: "+ session.service._id);
        Service.findOneAndRemove({
            _id: session.service._id
        }, function (err, user) {
    
            if (err) throw err;    
        }); 
        if(session.userName != 'Admin'){
            res.redirect('/customerBookings'); 
        }  
        else{
            res.redirect('/admin/allBookings'); 
        }
    };

     //Render review page
     exports.reviewByServiceId = function (req, res, next){
        req.service = session.service;
            var jsonService = JSON.parse(JSON.stringify(req.service));
            res.render('addReview', { title: 'Add Review', booking: jsonService} );
    };
    //Add a review
    exports.addReview = function (req, res, next) {
        req.service=req.service //read the service from request's body
        console.log("Adding review: "+ req.service);
        Service.findByIdAndUpdate(
            { _id: req.service._id },
            { review: req.body },
            function(err, result) {
              if (err) {
                res.send(err);
              } else {
                console.log("Adding a review"+ req.service);
                res.redirect('/customerBookings');
              }
            }
          );
    };

    exports.AllBookings = function (req, res, next) {
    Service.find({}, function(err, bookings){
        if(err){
            return next(err);        
        }else{
            console.log("Available bookings: "+bookings)
        }
    }).populate('client').exec((err, bookings)=>{
        //console.log(`Populated: `, customers)
        res.render(
            "allBookings", {
                title: 'All Bookings',
                bookings: bookings, 
        });
    })
};



