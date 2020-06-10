const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyPaser = require('body-parser')

const app = express()

app.set('port', process.env.PORT || 4000)

app.use(morgan('dev'))

app.use(bodyPaser.urlencoded({
  extended: false
}))

app.use(cors());

app.use(bodyPaser.json())

app.get('/', (req, res) => {
  return res.status(200).json({
    ok: true,
    message: "Welcome API MERN Task."
  })
})

app.listen(app.get('port'), () => {
  console.log(`Server on port: ${app.get('port')}`)
})