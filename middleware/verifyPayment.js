const https = require('https');

const verifyPaymentForm = () => {
    return async (req, res, next) => { 
        const isValidEmail = await validateEmail(req.body.Email);
        if(req.body.Email == null || !isValidEmail) {
            return res.status(400).send({
                error: "Invalid email."
            });
        }
        if(req.body.FirstName == null || req.body.LastName.length == 0) {
            return res.status(400).send({
                error: "Invalid first name."
            });
        }
        if(req.body.LastName == null || req.body.LastName.length == 0) {
            return res.status(400).send({
                error: "Invalid last name."
            });
        }
        next();
    }
}

const verifyCart = () => {
    return (req, res, next) => {
        if(req.body.roomPrice == null || req.body.roomType == null) {
            return res.status(400).send({
                error: "Invalid cart data."
            });
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
    verifyPaymentForm
}