const uuid = require('uuid')

// Get the currect user
const getUser = (req,res) => {
    res.json(
        {"firstname": "elad",
        "lastname":"pt",
        "role" : "Admin"
        }
    );
}

// Will update user details - Admin only
const addUser = (req,res) => {
    res.json({"status": "OK"});
}

// Will delete a user from the system - Admin only
const deleteUser = (req,res) => {
    res.json({"id":req.params.id});
}

exports.getUser = getUser;
exports.addUser = addUser;
exports.deleteUser = deleteUser;

