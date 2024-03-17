const asyncHandler = require("express-async-handler");



exports.getLogin = asyncHandler(async(req, res, next) =>{
    res.render("login");
})


