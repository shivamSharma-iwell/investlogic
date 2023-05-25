const express = require('express')
const router = express.Router()
const downloadInvoice = require('../controllers/invoiceGenerator')

router.get('/downloadInvoice', downloadInvoice.downloadInvoiceController)

module.exports = router