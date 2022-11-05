const https = require('https');
const Response = require('../config/response')
const onlyLettersRegex = /^[a-zA-Z]+$/;

const verifySearch = () => {
    return (req, res, next) => {
        const checkInDate = req.body.checkInDate;
        const checkOutDate = req.body.checkOutDate;

        if(checkInDate == null || checkOutDate == null) {
            return res.status(400).send({
                error: "Invalid date."
            })
        }

        next();
    }
}

const verifyPaymentForm = () => {
    return async (req, res, next) => { 
        const email = req.body.email;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;

        if(email == null) {
            return res.status(400).render('error', {errorCode: 400, errorMsg: Response.verification.emailError});
        }

        // Verify email with web service
        const isValidEmail = await validateEmail(email);
        if(!isValidEmail) {
            return res.status(400).render('error', {errorCode: 400, errorMsg: Response.verification.emailError});
        }

        if(firstName == null || firstName.length == 0 || !onlyLettersRegex.test(firstName)) {
            return res.status(400).render('error', {errorCode: 400, errorMsg: Response.verification.firstNameError});
        }
        if(lastName == null || lastName.length == 0 || !onlyLettersRegex.test(lastName)) {
            return res.status(400).render('error', {errorCode: 400, errorMsg: Response.verification.lastNameError});
        }
        next();
    }
}

const verifyCart = () => {
    return (req, res, next) => {
        if(req.body.roomPrice == null || req.body.roomType == null) {
            return res.status(400).render('error', {errorCode: 400, errorMsg: Response.verification.cartError});
        }
        next();
    }
}

const validateEmail = (email) => {
    return new Promise(((resolve, reject) => {
        const request = https.get('https://api.eva.pingutil.com/email?email=' + email, (resp) => {
            
          resp.setEncoding('utf8');
          let returnData = '';
    
          resp.on('data', (chunk) => {
            returnData += chunk;
          });
    
          resp.on('end', () => {
                parsedData = JSON.parse(returnData);
                resolve(parsedData.data.valid_syntax && parsedData.data.deliverable);
          });
    
          resp.on('error', (error) => {
              resolve(false);
          });
        });
        
        request.end();
      }));
  };

  module.exports = {
    verifyCart,
    verifyPaymentForm,
    verifySearch
}