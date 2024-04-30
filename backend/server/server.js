const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const { SESSION_SECRET } = require("../config");
const store = new session.MemoryStore();


const PORT = process.env.PORT || "5000"


app.use(passport.initialize());
app.use(passport.session());

// Set method to serialize data to store in cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
  });

 // Set method to deserialize data stored in cookie and attach to req.user
 passport.deserializeUser((id, done) => {
    done(null, { id });
  });

// Creates a session
app.use(
    session({  
      secret: 12345,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
      },
      store
    })
  );

  

app.use(cors());
app.use(bodyParser.json());

app.set('trust proxy', 1);


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
));

app.post("/login", passport.authenticate(LocalStrategy, { failureRedirect: "/login"}), (req, res) => {
  //If password === database password with hash:

    //Attaches an authenticated property to the session (wrapped in above if statement)
    req.session.authenticated = true;
    //Attaches a user object to the session (wrapped in above if statement)
    req.session.user = {
      username,
      password,
    }

});

app.post("/sign-up", (req, res) => {
    console.log(req.body)
    //To test if there is even a response, for now and if there is:
   res.json({"message": "Form submitted"});
});

app.listen(PORT, ()=> {
    console.log(`Now listening on port ${PORT}`)
})