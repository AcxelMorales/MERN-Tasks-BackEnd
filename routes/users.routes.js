const express = require('express')
const { check } = require('express-validator')

const usersCtrl = require('../controllers/users.controller')

const router = express.Router()

// ==============================================
//  Create user
// ==============================================
router.post('/', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'Agrega un e-mail valido').isEmail(),
  check('password', 'El password debe de contener 6 caracteres').isLength({ min: 6 })
], usersCtrl.postUser)

module.exports = router
