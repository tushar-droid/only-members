const asyncHandler = require("express-async-handler");
const passport = require("passport");



exports.getLogin = asyncHandler(async(req, res, next) =>{
    res.render("login");
})

// exports.postLogin = asyncHandler(async(req, res, next) =>{
//     console.log("~~~~~~~~~~~~~in the post part~~~~~~~~~~~~~~~~~~~")
//     passport.authenticate("local", {
//         successRedirect: "/posts",
//         failureRedirect: "/login"
//     })
// });



