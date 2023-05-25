const {scheme, schemeholding, sequelize} = require('../models/portfolioOverlap')
const {QueryTypes} = require('sequelize')

const getSchemesData = async (schemeName) => {
  const schemes = await scheme.sequelize.query(`
    SELECT shortName, schemeDetails.schid 
    FROM schemeDetails 
    JOIN schemes ON schemeDetails.schid = schemes.schid 
    WHERE mfTally = 'Y' AND dirPlan = 0 AND shortName LIKE '%${schemeName}%'`,
    {
      type: QueryTypes.SELECT,
    }
  )
  return schemes
}

const fetchPortfolioOverlap = async (schid1,schid2) => {
  const holdingA = await schemeholding.sequelize.query(
    `SELECT holdings, netAsset 
     FROM schemeHolding
     JOIN schemes  
     WHERE schemes.fsid = schemeHolding.fsid AND holdings NOT LIKE 'Net Receivables%' AND schemes.schid= '${schid1}'`,
    {
      type: QueryTypes.SELECT,
    }
  )
  const holdingB = await schemeholding.sequelize.query(
    `SELECT holdings,netAsset
     FROM schemeHolding
     JOIN schemes  
     WHERE schemes.fsid = schemeHolding.fsid AND holdings NOT LIKE 'Net Receivables%' AND schemes.schid= '${schid2}'`,
    {
      type: QueryTypes.SELECT,
    }
  )
  return { holdingA, holdingB }
}

module.exports = {
  getSchemesData,
  fetchPortfolioOverlap,
}
