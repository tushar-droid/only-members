const asyncHandler = require("express-async-handler");
const passport = require("passport");



exports.getLogin = asyncHandler(async(req, res, next) =>{
    //IF THE USER IS ALREADY AUTHENTICATED
    if(req.isAuthenticated()){
        console.log("USER IS AUTHENTICATED REDIRECTING TO POSTS")
        res.redirect("/posts")
        //res.render("all-posts", {user: req.user.name})
    }
    else{
        errorMsg =  req.session.messages;
        req.session.messages = '';
        res.render("login", {errorMsg});
    }
})





