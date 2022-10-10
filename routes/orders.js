const express = require('express');
const ordersController = require('../controllers/ordersController');

const router = express.Router();

router.route('/')
    .get(ordersController.getAllOrders)
    .post(ordersController.checkoutNewOrder)
    .put(ordersController.UpdateOrder)

router.route('/:id')
    .delete(ordersController.deleteOrder)

router.route('/summary')
    .post(ordersController.addNewOrder)

module.exports = router;