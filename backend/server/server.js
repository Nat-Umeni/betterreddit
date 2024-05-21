const express = require('express');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const bcrypt = require('bcrypt');
const pg = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const store = new session.MemoryStore();

 

// PostgreSQL connection

//change to something real
const pgPool = new pg.Pool({
    host: "",
    user: "",
    password: "",
    port: "",
    database: "",
  }); 

// Express session

app.use(session({
    store: new pgSession({
        pool: pgPool,
        tableName: 'session'
    }),
    secret: 12345, //change to something real
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    },
    store
}));

app.use(cors());
app.use(bodyParser.json());
app.set('trust proxy', 1);

 

// Passport initialization

app.use(passport.initialize());
app.use(passport.session());

 

// Passport local strategy

passport.use(new LocalStrategy((username, password, done) => {

    pgPool.query('SELECT * FROM users WHERE username = $1', [username], (err, result) => {

        if (err) {

            return done(err);

        }

        if (!result.rows.length) {

            return done(null, false, { message: 'Incorrect username.' });

        }

        const user = result.rows[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {

            if (err) {

                return done(err);

            }

            if (isMatch) {

                return done(null, user);

            } else {

                return done(null, false, { message: 'Incorrect password.' });

            }

        });

    });

}));

 

// Serialize and deserialize user

passport.serializeUser((user, done) => {

    done(null, user.id);

});

 

passport.deserializeUser((id, done) => {

    pgPool.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {

        if (err) {

            return done(err);

        }

        const user = result.rows[0];

        done(null, user);

    });

});

 

// Routes for authentication

app.post('/login', passport.authenticate('local'), (req, res) => {
    
    req.session.authenticated = true;

    res.json({ message: 'Login successful', user: req.username });


});

 


app.post('/sign-up', (req, res) => {

    const { username, password } = req.body;
 

    console.log("Start of bcrypt hash");
    
    bcrypt.hash(password, 10,  (err, hash) => {
        

        if (err) {

            return res.status(500).json({ error: err });

        }

    pgPool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hash], (err) => {

            if (err) {

                return res.status(409).json({ err: "Username Taken" });

            }

            console.log("Sign up complete");
            res.send({ message: 'Registration successful', user: username });
            

        });

    });

});

app.get('/profile', (req, res) => {
    
 const user = req.session.user;
 console.log(user)

    res.status(200).json({currentUser: user});

});

 

app.get('/logout', (req, res) => {

    req.logout();

    res.json({ message: 'Logout successful' });

});
 

app.listen(3001, () => {

  console.log('Server is running on port 3001');

});