const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require('bcrypt');
const User = require('./models/user');


passport.use(
    new LocalStrategy(async(username, password, done) =>{
        try{
            const user = await User.findOne({email: username});
            if(!user){
                return done(null, false, {message: "INCORRECT USERNAME"})
            }
            const match = bcrypt.compare(password, user.password);
            if(!match){
                return done(null, false, {message: "INCORRECT PASSWORD"})
            }

            return done(null, user);

        }
        catch(err){
            return done(err);
        }
    })
);


passport.serializeUser((user, done) =>{
    done(null, user);
});

passport.deserializeUser(async(id, done) =>{
    try{
        const user = await User.findById(id)
        done(null, user);
    }
    catch(err){
        done(err);
    }
})

module.exports = passport