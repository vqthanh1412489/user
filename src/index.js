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

app.post('/signup', parser, (req, res) => {
    const user = new User(req.body);
    user.save()
    .then(() => res.render('signupsuccess'))
    .catch(err => res.send('Sign Up Fail:' + err.message));
});


app.listen(3009, () => console.log('Server Started'));