
const { body } = require('express-validator');
const path = require('path');

module.exports = [
    body('nombre').notEmpty().withMessage('Debes completar tu nombre y apellido'),
    body('direccion').notEmpty().withMessage('Debes completar tu dirección'),
    body('celular').notEmpty().withMessage('Debes completar tu número de celular'),
    body('email')
        .notEmpty().withMessage('Debes escribir un correo electrónico').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('password').notEmpty().isStrongPassword(),
    body('avatar').custom((value, {req}) => {
        let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];

		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}
    return true;
})
];