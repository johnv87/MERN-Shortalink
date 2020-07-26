const { Router } = require('express')
const Link = require('../models/Link')
const router = Router()

router.get('/:code', async (req, res) => {
  try {
    // console.log('Request params', req.params)
    const link = await Link.findOne({ code: req.params.code })
    console.log(link)

    if (link) {
      //  Update clicks on link
      link.clicks++
      await link.save()
      //  Redirect to original link
      return res.redirect(link.from)
    }

    return res.status(404).json('Link not found')
  } catch (e) {}
})

module.exports = router
