const express = require('express')
const router = express.Router()
const controller = require('../controllers/portfolioCorrelation')

router.get('/getSchemes', controller.getSchemes)
router.get('/getNavs', controller.getNavs)
router.get('/getLaunchDate', controller.getLaunchDate)
module.exports = router