var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let listeCompteur = {
    compteurGET : 0,
    compteurPOST : 0,
    compteurDELETE : 0,
}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var filmsRouter = require('./routes/films');

var app = express();

app.use((req, res, next) => {
    if(req.method == 'GET'){
        listeCompteur.compteurGET++;
    } 
    if(req.method == 'POST'){
        listeCompteur.compteurPOST++
    }
    console.log(listeCompteur);
    next();
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/films',filmsRouter);



module.exports = app;
