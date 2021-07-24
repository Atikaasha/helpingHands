// Load the Mongoose module and Schema object
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//define a new CommentSchema
const ServiceSchema = new Schema({
    //
    addressLine1: String,
    addressLine2: String,
    city: String,
    province: String,
    postalCode: String,
    serviceType: String,
    serviceDate: String,
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'Requested'
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    serviceProvider: {
        type: String,
        default: 'Not assigned yet'
    },
    review:{
        rating: Number,
        comment: String,
        recommend: Boolean,
        default: ''
    }
});
//
mongoose.model('Service', ServiceSchema);
