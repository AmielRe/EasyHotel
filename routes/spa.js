const express = require('express');
const router = express.Router();
const spaController = require("../controllers/spaController");

router.get("/", spaController.initSpa);
module.exports = router;