const uuid = require('uuid')

const getAllServices = (req,res) => {
    res.status(200).json([{
        "service": "SPA",
        "price": "999",
        "available": true,
        "_id": "567765"
    }])
}

const addNewService = (req,res) => {
    res.json({"id":uuid.v4()});
}

const UpdateService = (req,res) => {
    res.json({"status":"OK"});
}

const deleteService = (req,res) => {
    res.json({"id":req.params.id});
}

module.exports = {
    getAllServices,
    addNewService,
    UpdateService,
    deleteService
}

