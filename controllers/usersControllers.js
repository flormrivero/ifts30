const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/Users');

const controllers = {
    register: (req, res) => {
        return res.render ('register');
    },
    processRegister : (req, res) => {
       const resultValidation = validationResult(req);

       if(resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData : req.body,
            });
        }
    let userInDB = User.findbyField('email', req.body.email)    

    if(userInDB) {
        return res.render('register', {
            errors: {
                email: {
                    msg: 'Este email ya está registrado'
                }
            },
            oldData : req.body,
    });
    } 
    let userToCreate = {
        ...req.body,
        password: bcryptjs.hashSync(req.body.password, 10),
        avatar: req.file.filename
    }
    let userCreate = User.create(userToCreate)
        return res.redirect('login')
    },
    login: (req, res) => {
        return res.render ('login');
    },
    loginProcess:  (req, res) => {
        let userToLogin = User.findbyField('email', req.body.email);

        if(userToLogin) {
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if(isOkThePassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                if(req.body.recordar) {
                    res.cookie('userEmail', req.body.email, {maxAge: (1000 * 60) * 60})
                }
                return res.redirect('userProfile')
            }
            return res.render('login', {
                errors: {
                    password: {
                        msg: 'Contraseña incorrecta'
                    }
                }    
            });
        }
        return res.render('login', {
            errors: {
                email: {
                    msg: 'No se encuentra este email'
                }
            }
        });
        
    },
    profile : (req, res) => {
        return res.render('userProfile', {
            user: req.session.userLogged
        });
    },
    logout : (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/')
    },
}

module.exports = controllers;
