
require('dotenv').config(); //para utilizar .env
require('./mongo');


let bookings = [];

const express = require('express');
const app = express();
const logger = require('./loggerMiddleware');
const cors = require('cors');
const Booking = require('./models/Booking');
const mailer = require('./mailer');

app.use(cors()); //permite que cualquier origen funcione en nuestra api
app.use(express.json()); //parsea jsons

app.get('/', (request,response) => {
    response.send('<h1>RESERVAS. node.js & Mongo DB</h1>');
});

app.get('/api/bookings', (request,response) => {
    console.log('Searching all bookings...');
    Booking.find({}).then(bookings => {
        response.json(bookings);
    });
});

app.get('/api/bookings/:id', (request,response) => {
    const id = Number(request.params.id);
    console.log('Searching booking...');
    Booking.findById(id)
        .then(booking => {
            if(booking){
                return response.json(booking);
            } else {
                response.status(404).end();
            }
        })
});


app.delete('/api/bookings/:id', (request,response) => {
    const id = Number(request.params.id);
    console.log('Deleting booking ID: ' + id + "...");
    bookings = bookings.filter(booking => booking.id !== id);
    response.json(bookings);
});

app.post('/api/bookings', (request,response) => {
    console.log('Creating booking...');

    const booking = request.body;

    mailer.sendMail(booking);
    
    if(!booking || !booking.name) {
        return response.status(400).json({
            error: 'booking.name is missing!'
        });
    }

    if(!booking || !booking.phone) {
        return response.status(400).json({
            error: 'booking.phone is missing!'
        });
    }

    const newBooking = new Booking({
        name: booking.name,
        mail: booking.mail,
        phone: booking.phone
    });

    newBooking.save()
        .then(result => {
            console.log(result);
            response.json(newBooking);
        }).catch(e =>  {
            console.error(e);
        }); 
});

app.use((request, response) => {
    console.log(request.path); //logea desde que url viene
    response.status(404).json({
        error: 'URL not founded'
    });
});

const PORT = process.env.PORT || 3001; //heroku  process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); //el servidor escucha el PORT





