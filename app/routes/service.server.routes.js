const service = require('../../app/controllers/service.server.controller');

module.exports = function (app) {
    // app.route('/bookService')
    // .get(service.bookService);
    // app.post('/thanks', service.completeBookingService);

    app.param('userId', service.completeBookingService);
    app.route('/thanks').get(service.completeBookingService);

    app.route('/bookService').get(service.customerByUserName);
    app.post('/thanks', service.completeBookingService);
    app.route('/customerBookings').get(service.bookingsByCustomer);

    app.route('/editBooking/:_id').get(service.findServiceById).post(service.serviceByServiceId);

    app.route('/customerBookings/:_id').get(service.read).put(service.update).delete(service.deleteByServiceId);
    app.route('/admin/allBookings').get(service.AllBookings);

    app.route('/addReview/:_id').get(service.findServiceById).post(service.reviewByServiceId);

    app.route('/addReview/review/:_id').get(service.read).put(service.addReview);

    app.param('_id', service.findServiceById);

    app.route('/aboutUs').get(service.aboutUs);
};