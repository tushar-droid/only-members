const asyncHandler = require("express-async-handler");
const passport = require("passport");



exports.getLogin = asyncHandler(async(req, res, next) =>{
    //IF THE USER IS ALREADY AUTHENTICATED
    if(req.isAuthenticated()){
        res.redirect("/posts", {user: req.user.name})
    }
    else{
        errorMsg =  req.session.messages;
        req.session.messages = '';
        res.render("login", {errorMsg});
    }
})


// exports.postLogin = asyncHandler(async(req, res, next) =>{
//     console.log("~~~~~~~~~~~~~in the post part~~~~~~~~~~~~~~~~~~~")
//     passport.authenticate("local", {
//         successRedirect: "/posts",
//         failureRedirect: "/login"
//     })
// });



