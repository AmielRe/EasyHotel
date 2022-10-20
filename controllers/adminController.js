const Config = require('../config/roles')



const getAdminPanel = async (req,res) => {
    res.render('admin-panel.ejs')
}

const getRolePanel = async (req,res) => {
    res.render('roles.ejs')
}

const getAllRoles = async (req,res) => {
    res.status(200).json(Config.ROLES)
}

module.exports = {
    getAdminPanel,
    getRolePanel,
    getAllRoles
}