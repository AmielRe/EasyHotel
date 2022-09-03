const uuid = require('uuid')

const getOrders = (req,res) => {
    res.send("Will return all of user orders");
}

const addOrder = (req,res) => {
    res.json({"id":uuid.v4()});
}

const deleteOrder = (req,res) => {
    res.json({"id":req.params.id});
}

exports.getOrders = getOrders;
exports.addOrder = addOrder;
exports.deleteOrder = deleteOrder;

