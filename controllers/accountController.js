const { getJwtDetails } = require('../middleware/verifyJWT');

const personalSpace = (req,res) => {
    res.render("guest-panel.ejs", {jwt: getJwtDetails(req.cookies.jwt)})
}