const { getJwtDetails } = require('../middleware/verifyJWT');

const initSpa = (req, res) => {
    res.render("spa.ejs", { jwt: getJwtDetails(req.cookies.jwt) })
}

module.exports = {
    initSpa
}