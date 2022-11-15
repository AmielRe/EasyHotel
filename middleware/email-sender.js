const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
require('dotenv/config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = (userEmail, firstName, checkinDate, checkoutDate, rooms, totalCost, bookingCode) => {
    ejs.renderFile(path.resolve('templates/confirmation-mail.ejs'), { firstName, checkinDate, checkoutDate, totalCost, rooms, userEmail, bookingCode}, (err, data) => {
        if (err) {
        
      } else {
        const email = {
          from: process.env.EMAIL_USER,
          to: userEmail,
          subject: 'EasyHotel: Booking confirmation',
          html: data
        };

        transporter.sendMail(email, (error, info) => {
          if (error) {
            return 
          }
          
        });
      }
    });
  };

  module.exports = {
    sendEmail
  };