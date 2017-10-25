const express = require('express');
const app = express();
const session = require('express-session');
const parser = require('body-parser').urlencoded({ extended: false });

const User = require('./user');
require('./db');


app.set('views', './views');
app.set('view engine', 'ejs');
app.use(session({
    secret: 'vuquocthanh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 15000 },
    rolling: true
}));

app.get('/signup', (req, res) => {
    const { user } = req.session;
    if (user) return res.redirect('/user');
    res.render('signup');
});

app.get('/signin', (req, res) => {
    const { user } = req.session;
    if (user) return res.redirect('/user');
    res.render('signin');
});

app.post('/signup', parser, (req, res) => {
    const { username, password, email } = req.body;
    User.signUp(username, password, email)
        .then(() => res.status(200).render('signupsuccess'))
        .catch(err => res.status(401).send(err.message));
});

app.post('/signin', parser, async (req, res) => {
    const { email, password } = req.body;
    User.signIn(email, password)
        .then(user => {
            req.session.user = {email, password, username: user.username};
            res.status(200).render('loginsucces');
        })
        .catch(err => res.status(401).send(err.message));
});

app.get('/user', (req, res) => {
    const { user } = req.session;
    if (!user) return res.redirect('/signin');
    res.render('user', { user });
});


app.listen(3009, () => console.log('Server Started'));

module.exports = app;