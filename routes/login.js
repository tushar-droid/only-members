const express = require("express");
const router = express.Router();
const loginController = require('../controllers/loginController');
const passport = require("passport");

router.get("/", loginController.getLogin);
// router.post("/", loginController.postLogin);
router.post("/", passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/signup"
}))

module.exports = router;
