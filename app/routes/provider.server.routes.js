const provider = require('../controllers/provider.server.controller');
const service = require('../controllers/service.server.controller');

module.exports = function (app) {
    app.route('/acceptedBookings').get(provider.bookingsAcceptedByProvider);
    app.route('/availableBookings/:_id').get(service.read).put(provider.update);
    //app.route('/acceptedBookings/:_id').get(service.read).put(provider.complete);
    app.route('/availableBookings').get(provider.display);
    //app.route('/allReviews').get(provider.allReviews);
    //app.param('_id', service.findServiceById);
};