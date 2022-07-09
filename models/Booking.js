const {model, Schema} = require('mongoose');

const bookingSchema = new Schema({
    name: String,
    mail: String,
    phone: String
});

//transforma el json
bookingSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id,
        delete returnedObject._id,
        delete returnedObject.__v
    }
});

const Booking = model('Booking', bookingSchema);

module.exports = Booking