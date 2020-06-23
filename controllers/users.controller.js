const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const User = require('../models/User.model')

exports.postUser = async (req, res) => {
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

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario ya existe'
      })
    }

    user = new User(req.body)

    const salt = await bcryptjs.genSalt(10)
    user.password = await bcryptjs.hash(password, salt)

    await user.save()

    const payload = {
      user: {
        id: user._id
      }
    }

    jwt.sign(payload, process.env.SEED, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err
      return res.json({ token })
    })

    // return res.status(201).json({
    //   ok: true,
    //   msg: `Usuario creado - ${req.body.name}`
    // })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      ok: false,
      msg: 'Hubo un error en la creacion del usuario'
    })
  }
}
