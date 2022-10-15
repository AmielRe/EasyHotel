const verifyPaymentForm = () => {
    return (req, res, next) => { 
        if(req.body.Email == null || !validateEmail(req.body.Email)) {
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
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  };

  module.exports = {
    verifyCart,
    verifyPaymentForm
}