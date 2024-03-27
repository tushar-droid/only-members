const asyncHandler = require('express-async-handler');
const User = require("../models/user");


exports.homePage = asyncHandler(async(req, res, next) =>{
    const allUsers = await User.find({}).exec()
    res.render("home", {users: allUsers, isAuthenticated:  req.isAuthenticated()} );
})

exports.getLogout = asyncHandler(async(req, res, next) =>{
    req.logout((err) =>{
        if(err){
            return next(err)
        }
        res.redirect('/posts')        
    });
})

