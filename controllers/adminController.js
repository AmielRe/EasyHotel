const Config = require('../config/roles')

// Get the currect user
const getAdminPanel = async (req,res) => {
    res.render('admin-panel.ejs')
}

module.exports = {
    getAdminPanel
}