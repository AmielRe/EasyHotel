const uuid = require('uuid')

const getAllOrders = (req,res) => {
    res.send("Will return all of user orders");
}

const addNewOrder = (req,res) => {
    res.json({"id":uuid.v4()});
}

const UpdateOrder = (req,res) => {
    res.json({"status":"OK"});
}

const deleteOrder = (req,res) => {
    res.json({"id":req.params.id});
}

module.exports = {
    getAllOrders,
    addNewOrder,
    UpdateOrder,
    deleteOrder
}

