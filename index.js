const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyPaser = require('body-parser')

const connectDB = require('./config/db')

// ==============================================
//  Variables
// ==============================================
const app = express()

// ==============================================
//  Settings
// ==============================================
app.set('port', process.env.PORT || 4000)

// ==============================================
//  Middlewares
// ==============================================
app.use(morgan('dev'))

app.use(bodyPaser.urlencoded({
  extended: false
}))

app.use(cors());

app.use(bodyPaser.json())

// ==============================================
//  Database conection
// ==============================================
connectDB()

// ==============================================
//  Routes
// ==============================================
app.use('/api/v1/users', require('./routes/users.routes'))
app.use('/api/v1/auth', require('./routes/auth.routes'))
app.use('/api/v1/projects', require('./routes/projects.routes'))

app.get('/', (req, res) => {
  return res.status(200).json({
    ok: true,
    message: "Welcome API MERN Task."
  })
})

// ==============================================
//  Listener
// ==============================================
app.listen(app.get('port'), () => console.log(`Server on port: ${app.get('port')}`))
