const asyncHandler = require("express-async-handler");



exports.getSignup = asyncHandler(async(req, res, next) =>{
    res.render("signup");
})

