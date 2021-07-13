const service = require('../../app/controllers/service.server.controller');

module.exports = function (app) {
    app.param('userId', service.completeBookingService);
    app.route('/thanks').get(service.completeBookingService);

    app.route('/bookService').get(service.customerByUserName);
    app.post('/thanks', service.completeBookingService);
    app.route('/customerBookings').get(service.bookingsByCustomer);
    app.param('_id', service.findServiceById);
};