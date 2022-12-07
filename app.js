
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const session = require('express-session');
const methodOverride = require('method-override');


//middleware
const userLoggedMiddleware = require('./middleware/userLoggedMiddleware');

//Routers
const mainRoutes = require('./routes/mainRoutes');
const productsRoutes = require('./routes/productsRoutes')
const userRoutes = require('./routes/userRoutes');

//EJS
app.set('view engine', 'ejs');

//Session
app.use(session({
    secret: 'IFTS 30',
    resave: false,
    saveUninitialized: false,
}));

app.use(cookieParser());
app.use(userLoggedMiddleware);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
const publicFolderPath = path.resolve('public');
app.use(express.static(publicFolderPath));

app.use('/', mainRoutes);
app.use('/user', userRoutes);
app.use('/products', productsRoutes);

//PUERTO
const APP_PORT = process.env.PORT || 3040;
app.listen(APP_PORT, () => {
    console.log('Servidor funcionando en puerto ' + APP_PORT)
})

module.exports = app;