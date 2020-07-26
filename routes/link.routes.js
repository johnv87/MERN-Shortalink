const { Router } = require('express')
const config = require('config')
//  Install shortid (npm i shortid)
const shortId = require('shortid')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl')

    const { from } = req.body

    const code = shortId.generate()

    const existing = await Link.findOne({ from })

    if (existing) {
      return await res.json({ link: existing })
    }

    const to = baseUrl + '/t/' + code

    const link = new Link({
      code,
      to,
      from,
      owner: req.user.userId,
    })

    await link.save()

    res.status(201).json({ link })
  } catch (e) {
    res.status(500).json({
      message: `Something went wrong /generate. Try again ${e.message}`,
    })
  }
})
router.get('/', /*Middleware*/ auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId })
    await res.json(links)
  } catch (e) {
    res
      .status(500)
      .json({ message: `Something went wrong /. Try again ${e.message}` })
  }
})
router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id) //???
    await res.json(link)
  } catch (e) {
    res
      .status(500)
      .json({ message: `Something went wrong /:id. Try again ${e.message}` })
  }
})

module.exports = router
