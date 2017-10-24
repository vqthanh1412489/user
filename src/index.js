const express = require('express');
const app = express();
const parser = require('body-parser').urlencoded({extended: false});

const User = require('./user');
require('./db');


app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/signin', (req, res) => {
    res.render('signin');
});

app.post('/signup', parser, (req, res) => {
    const { username, password, email } = req.body;
    User.signUp(username, password, email)
    .then(() => res.render('signupsuccess'))
    .catch(err => res.send('Sign Up Fail:' + err.message));
});

app.post('/signin', parser, async (req, res) => {
    const { email, password } = req.body;
    User.signIn(email, password)
    .then(() => res.status(200).render('loginsucces'))
    .catch(err => res.status(401).send('Login Fail: ' + err.message));
});


app.listen(3009, () => console.log('Server Started'));