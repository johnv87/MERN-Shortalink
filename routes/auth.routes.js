const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
// JSON WebToken
const jsonWebToken = require('jsonwebtoken')
// Express Validator
const { check, validationResult } = require('express-validator')
// User Model
const User = require('../models/User')
const router = Router()

// Request to /api/auth/register
router.post(
  '/register',
  //Express Validator Middleware with it's settings
  [
    check('email', 'Wrong email').isEmail(),
    check('password', 'Minimal password length 6 symbols').isLength({ min: 6 }),
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request)

      if (!errors.isEmpty()) {
        // If errors obj is not empty return
        return response.status(400).json({
          errors: errors.array(),
          message: 'Incorrect registration data',
        })
      }

      const { email, password } = request.body
      // console.log(request.body)

      // On receive email and password from frontend
      // check if user exists according to User model
      const candidate = await User.findOne({ email })

      if (candidate) {
        return response.status(400).json({ message: 'Such user exists' })
      }
      // Encrypt password with bcryptjs: npm i bcryptjs
      const hashedPassword = await bcrypt.hash(password, 12)
      // When password is encrypted (hashed) create new user
      const user = new User({ email, password: hashedPassword })
      await user.save()
      // Response status 201 - Created
      response
        .status(201)
        .json({ message: 'User created. Now you can log in.' })
    } catch (e) {
      // Server error
      response.status(500).json({ message: 'Something went wrong. Try again.' })
    }
  }
)
// Request to /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Enter correct email').normalizeEmail().isEmail(),
    check('password', 'Wrong password').exists(),
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request)

      if (!errors.isEmpty()) {
        return response.status(400).json({
          errors: errors.array(),
          message: 'Incorrect login data',
        })
      }

      const { email, password } = request.body
      // Find One user with provided email if exists in DB
      const user = await User.findOne({ email })

      if (!user) {
        return response.status(400).json({ message: 'User not found' })
      }
      // Compare passwords from DB and Frontend
      const isPasswordMatch = await bcrypt.compare(password, user.password)

      if (!isPasswordMatch) {
        return response
          .status(400)
          .json({ message: 'Wrong login data, try again...' })
      }
      // Authorize user with help of jsonwebtoken (npm i jsonwebtoken)
      const token = jsonWebToken.sign(
        //  Set user id
        { userId: user.id },
        //  Set secret key from default.json config
        config.get('jwtSecret'),
        //  Set when token expires
        { expiresIn: '1h' }
      )

      //  Send response to user
      await response.json({ token, userId: user.id })
      console.log(`User ${user._id} logged in`)
    } catch (e) {
      response
        .status(500)
        .json({ message: `Something went wrong. Try again ${e.message}` })
    }
  }
)

module.exports = router
