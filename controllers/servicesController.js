const Service = require('../models/services');
const Response = require('../config/response');

const getAllServices = async (req,res) => {
    try {
        const service = await Service.find();
        res.status(200).json(service);
    }
    catch (err) {
        res.status(500).json({ "error": Response.status[500]});
    }
}

const addNewService = async (req,res) => {
    try {
        const service = new Service({
            name: req.body.name,
            cost: req.body.cost
        });
        await service.save();
        res.status(200).json({"status" : Response.status[200]});
    }
    catch (err) {
        res.status(500).json({"status" : Response.status[500]});
    }
}

const UpdateService = (req,res) => {
    var newData = {
        "name": req.body["0"],
        "cost": req.body["1"],
        "reserved": req.body["2"]
    }

    try {
        Service.updateOne({'_id': req.params.id}, {$set:newData}, function(err, response) {
            if (err) {
                res.status(500).json({"error":Response.status[500]})
            }
            else {
                res.status(200).json({"status":"Service has been updated"})
            }
        });
    }
    catch (err) {
        res.status(500).json({"error": Response.status[500]});
    }
}

const deleteService = async (req,res) => {
    try {
        await Service.deleteOne({"_id": req.params.id});

        res.status(200).json({"status": "Service deleted!"});
    }
    catch (err) {
        res.status(500).json({"error": Response.status[500]});
    }
}

module.exports = {
    getAllServices,
    addNewService,
    UpdateService,
    deleteService
}