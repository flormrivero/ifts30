const fs = require('fs');
const path = require('path');

const mainRoutes = require('../routes/mainRoutes');

const controller = {
    index : (req, res)=>{
        return res.render('index');
      },
    register : (req, res) => {
        return res.render('register');
    },
    login : (req, res) => {
        return res.render('login');
    },
    profile: (req, res) => {
        return res.render('userProfile');
    },
}

module.exports = controller;
