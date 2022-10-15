const express = require('express');
const ordersController = require('../controllers/ordersController');
const verification = require('../middleware/verifyPayment');

const router = express.Router();

router.route('/')
    .get(ordersController.getAllOrders)
    .post(verification.verifyCart(), ordersController.checkoutNewOrder)
    .put(ordersController.UpdateOrder)

router.route('/:id')
    .delete(ordersController.deleteOrder)

router.route('/summary')
    .post(verification.verifyCart(), verification.verifyPaymentForm(), ordersController.addNewOrder)

module.exports = router;