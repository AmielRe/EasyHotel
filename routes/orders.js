const express = require('express');
const ordersController = require('../controllers/ordersController');
const verification = require('../middleware/verification');

const router = express.Router();

router.route('/')
    .get(ordersController.getAllOrders)
    .post(verification.verifySearch(), ordersController.showAvailableRooms)
    .put(ordersController.updateOrder)

router.route('/:id')
    .delete(ordersController.deleteOrder)

router.route('/payment')
    .post(verification.verifyCart(), ordersController.checkoutNewOrder)

router.route('/getTakenRooms')
    .get(ordersController.getAllOrdersByDate)

router.route('/payment/summary')
    .post(verification.verifyCart(), verification.verifyPaymentForm(), ordersController.addNewOrder)


module.exports = router;