const express = require("express");
const homeController = require("../controllers/homeController");

const router = express.Router();


router.get("/", homeController.homePage);
router.get("/logout", homeController.getLogout);


module.exports = router;


