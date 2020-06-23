const jwt = require('jsonwebtoken')

// ==============================================
//  Authentication token
// ==============================================
module.exports = function(req, res, next) {
  const token = req.header('x-auth-token')

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token. Permiso denegado'
    })
  }

  try {
    const c = jwt.verify(token, process.env.SEED)
    req.user = c.user

    next()
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token inválido'
    })
  }
}
