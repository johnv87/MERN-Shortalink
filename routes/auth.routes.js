const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jsonWebToken = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()

// /api/auth
router.post(
  '/register',
  [
    check('email', 'Wrong email').isEmail(),
    check('password', 'Minimal password length 6 symbols').isLength({ min: 6 }),
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request)

      if (!errors.isEmpty()) {
        return response.status(400).json({
          errors: errors.array(),
          message: 'Incorrect registration data',
        })
      }

      const { email, password } = request.body

      const candidate = await User.findOne({ email })

      if (candidate) {
        return response.status(400).json({ message: 'Such user exists' })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ email, password: hashedPassword })
      await user.save()

      response.status(201).json({ message: 'User created' })
    } catch (e) {
      response.status(500).json({ message: 'Something went wrong. Try again' })
    }
  }
)
// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Enter correct email').normalizeEmail().isEmail(),
    check('password', 'Incorrect password').exists(),
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

      const user = await User.findOne({ email })

      if (!user) {
        return response.status(400).json({ message: 'User not found' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return response
          .status(400)
          .json({ message: 'Wrong password, try again...' })
      }

      const token = jsonWebToken.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      )

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
