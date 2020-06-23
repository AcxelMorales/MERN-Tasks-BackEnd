const express = require('express')
const { check } = require('express-validator')

const authCtrl = require('../controllers/auth.controller')

const router = express.Router()

router.post('/', [
  check('email', 'Agrega un e-mail valido').isEmail(),
  check('password', 'El password debe de contener 6 caracteres').isLength({ min: 6 })
], authCtrl.auth)

module.exports = router
