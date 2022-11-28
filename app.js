
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const publicFolderPath = path.resolve('public');
const session = require('express-session');



app.use(express.static(publicFolderPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Session
app.use(session({
    secret: 'IFTS 30',
    resave: false,
    saveUninitialized: false,
}));

//app.use(userLoggedMiddleware);
app.use(cookieParser());

//const userLoggedMiddleware = require('./middleware/userLoggedMiddleware');

//Routers
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/', mainRoutes);
app.use('/user', userRoutes);

//EJS
app.set('view engine', 'ejs');


//PUERTO
const APP_PORT = process.env.PORT || 2008;
app.listen(APP_PORT, () => {
    console.log('Servidor funcionando en puerto ' + APP_PORT)
})

module.exports = app;