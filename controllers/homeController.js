const asyncHandler = require('express-async-handler');


exports.homePage = asyncHandler(async(req, res, next) =>{
    res.render("home");
})

