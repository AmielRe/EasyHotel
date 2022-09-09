const express = require('express');
const ordersController = require('../controllers/ordersController');

const router = express.Router();


router.route('/')
    .get(ordersController.getAllOrders)
    .post(ordersController.addNewOrder)
    .put(ordersController.UpdateOrder)


router.route('/:id')
    .delete(ordersController.deleteOrder)

module.exports = router;