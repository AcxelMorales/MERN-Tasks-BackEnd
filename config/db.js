const mongoose = require('mongoose')

// ==============================================
//  Settings
// ==============================================
require('dotenv').config({ path: '.env' })
mongoose.set('useCreateIndex', true)

// ==============================================
//  Database connection
// ==============================================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.BD_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    console.log('Database online')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB
