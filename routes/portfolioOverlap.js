const express = require('express')
const router = express.Router()
const portfolioOverlap = require('../controllers/portfolioOverlap')

// api for portfolioOverlap
router.get('/getSchemes', portfolioOverlap.getSchemes)
router.get('/getPortfolioOverlap', portfolioOverlap.getPortfolioOverlap)

module.exports = router