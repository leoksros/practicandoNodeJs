const nodemailer = require('nodemailer');

function sendMail(booking) {

  console.log('Reserva: ');
  console.log(booking);

  //Creamos el objeto de transporte
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAILER_ACCESS,
      pass: process.env.MAILER_PASSWORD,
    }
  });

  let msg = "Hello ✔";

  let mailOptions = {
    from: process.env.MAILER_ACCESS,
    to: booking.mail, //receipt
    subject: 'Esta es tu reserva!',
    text: msg,
    html: "<b>Hola " + booking.name + "!!</b>"
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email enviado: ' + info.response);
    }
  });
}

module.exports = { sendMail };


