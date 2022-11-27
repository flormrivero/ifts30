const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/usersControllers');
const validations = require('../middleware/validationRegisterMiddleware');
const uploadFile = require('../middleware/multerMiddleware');
const guestMiddleware = require('../middleware/guestMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

//Formulario de registro
router.get('/register', guestMiddleware, usersControllers.register);

//Procesar el registro
router.post('/register', uploadFile.single('avatar'), validations, usersControllers.processRegister);

//Formulario de login
router.get('/login', guestMiddleware, usersControllers.login);

//Proceso de login
router.post('/login', usersControllers.loginProcess);

//Perfil de usuario
router.get('/profile', authMiddleware, usersControllers.profile);

//Logout de usuario
router.get('/logout', usersControllers.logout);



module.exports = router;