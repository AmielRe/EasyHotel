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

//verification.verifyCart(), verification.verifyPaymentForm(),
// remove verfication caused error on redirect to this path
router.route('/payment/summary')
    .post(ordersController.addNewOrder)


module.exports = router;