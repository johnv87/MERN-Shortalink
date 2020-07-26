//Required imports
const express = require('express')
//Work with default.json config file
const config = require('config')
//Module to resolve file paths
const path = require('path')
//Package to connect MongoDB
const mongoose = require('mongoose')

const app = express()

//  To get request body correct
app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))

//  Connect redirect from short link to standard web link
app.use('/t', require('./routes/redirect.routes'))

//  GET PORT from default.json config file
const PORT = config.get('port') || 5000

//  Set static route when app is deployed on server and is in production
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

async function start() {
  try {
    await mongoose.connect(config.get('mongoURI'), {
      //Default setup for mongoose to connect the DB
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
  } catch (e) {
    console.log('Server error', e.message)
    process.exit(1)
  }
}

start()
