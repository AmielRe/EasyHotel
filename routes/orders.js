const express = require('express');
const { getOrders, addOrder, deleteOrder } = require('../controllers/orders');

const router = express.Router();

// Gets all of users orders
router.get('/', getOrders);

// Create new order
router.post('/', addOrder);

// Deletes order by id (should be uuid)
router.delete('/:id', deleteOrder);

module.exports = router;