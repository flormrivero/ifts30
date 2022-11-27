const express = require('express');
const router = express.Router();
const mainController = require('../controllers//mainController');

// INDEX
router.get('/', mainController.index);

// REGISTER X GET
router.get('/register', mainController.register);

// REGISTER X POST
router.get('/register', mainController.register);

//LOGIN
router.get('/login', mainController.login);

//PROFILE
router.get('/userProfile', mainController.profile);

module.exports = router;