require('dotenv').config();
const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const LocalStrategy = require("passport-local").Strategy;


const PORT = process.env.PORT || "5000"
let temp = 1;

app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    secret: temp,
    resave: false, 
    saveUninitialized: false
}))
app.use(cors());


passport.use(new LocalStrategy(
    function (username, password, done){
        //Looks for the user in the database
        db.users.findByUsername(username, (err, user) => {
            //If theres an error return the rerror
            if (err) return done(err);

            //If the user can't be found, returns nulll and false;
            if(!user) return done(null, false);

            //If the user is found, but the password is not valid
            if(user.password != password) return done(null, false);

            //The user is found and the password is valid, return the user.
            return (null, user);
            
        })
    }
))

app.post("/login", passport.authenticate(LocalStrategy, { failureRedirect: "/login"}), (req, res) => {
    res.redirect("/")
})

app.listen(PORT, ()=> {
    console.log(`Now listening on port ${PORT}`)
})