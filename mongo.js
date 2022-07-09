const mongoose = require('mongoose');
const connectionString = process.env.MONGO_DB_URI;

//conexión a mongo
mongoose.connect(connectionString)
    .then(() => {
        console.log('DB connected!!');
    }).catch(err => {
        console.error(err);
    });
