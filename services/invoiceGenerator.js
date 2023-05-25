const axios = require('axios')
const PYTHON_API = 'http://localhost:8000/pythonDownloadInvoice'

const downloadInvoiceService = async (reqQuery) => {
  try{
  const response = await axios({
      url: PYTHON_API,
      method: 'POST',
      data: reqQuery
    })
    const result = response && response.data
    return result
  }
  catch(error){
    throw error
  } 
}

module.exports = {
    downloadInvoiceService
}