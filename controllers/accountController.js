const { getJwtDetails } = require('../middleware/verifyJWT');

const initAccount = (req,res) => {
    res.render("account.ejs", {jwt: getJwtDetails(req.cookies.jwt)})
}

module.exports= {
    initAccount
}