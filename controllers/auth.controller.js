const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const User = require('../models/User.model')

// ==============================================
//  Authentication controller
// ==============================================
exports.auth = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.array()
    })
  }

  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe'
      })
    }

    const passOk = await bcryptjs.compare(password, user.password)

    if (!passOk) {
      return res.status(401).json({
        ok: false,
        msg: 'Password incorrecto'
      })
    }

    const payload = { user: { id: user._id } }

    jwt.sign(payload, process.env.SEED, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err
      return res.json({ token })
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      ok: false,
      msg: 'Hubo un error en la autenticación'
    })
  }
}
