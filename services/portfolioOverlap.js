const { getSchemesData, fetchPortfolioOverlap } = require('../repositories/portfolioOverlap')
// Get Schemes Data
const getSchemes = async (schemeName) => {
  return getSchemesData(schemeName)
}

// Calculate Portfolio Ovelap  
const getPortfolioOverlap = async (schid1, schid2) => {
  const schemeHoldings = await fetchPortfolioOverlap(schid1, schid2)
  const {holdingA, holdingB} = schemeHoldings

  let percentage = 0
  let holding = []
  let unCommonData = []
  let commonHoldings = 0
  let commonHoldingASum = 0
  let commonHoldingBSum = 0

  holdingA.forEach((item1) => {
    const item2 = holdingB.find((data) => data.holdings == item1.holdings)
    if (item2) {
      holding.push({
        holdingsA: item1.holdings,
        holdingsB: item2.holdings,
        netAssetA: item1.netAsset,
        netAssetB: item2.netAsset
      })
      commonHoldings++
      commonHoldingASum = commonHoldingASum + item1.netAsset
      commonHoldingBSum = commonHoldingBSum + item2.netAsset
      percentage += Math.min(item1.netAsset, item2.netAsset)
    } else {
      unCommonData.push({
        holdingsA: item1.holdings,
        holdingsB: '',
        netAssetA: item1.netAsset,
        netAssetB: 0
      })
    }
  })

  holdingB.forEach((item2) => {
    const item1 = holdingA.find((data) => data.holdings == item2.holdings)
    if (!item1) {
      unCommonData.push({
        holdingsA: '',
        holdingsB: item2.holdings,
        netAssetA: 0,
        netAssetB: item2.netAsset
      })
    }
  })
  // concat Common Holdings and Uncommon Holdings
  holding = holding.concat(unCommonData)

  // find sumNetAssetHoldingA
  const sumNetAssetHoldingA = holdingA
    .filter((h1) => !holdingB.some((h2) => h2.holdings == h1.holdings))
    .reduce((total, h1) => total + h1.netAsset, 0)

  // find sumNetAssetHoldingB
  const sumNetAssetHoldingB = holdingB
    .filter((h2) => !holdingA.some((h1) => h1.holdings == h2.holdings))
    .reduce((total, h2) => total + h2.netAsset, 0)

  const result = {
    holding,
    vennDiagram: {
      holdingAOnlyNetAsset: Math.round(sumNetAssetHoldingA),
      holdingBOnlyNetAsset: Math.round(sumNetAssetHoldingB),
      commonHoldingA: Math.round(commonHoldingASum),
      commonHoldingsB: Math.round(commonHoldingBSum)
    },

    overlapValue: {
      overlapPercentage: Math.round(percentage),
      commonHoldings,
      unCommonHoldingsInA: holdingA.length - commonHoldings,
      unCommonHoldingsInB: holdingB.length - commonHoldings,
      totalHoldingsInA: holdingA.length,
      totalHoldingsInB: holdingB.length
    }
  }
  return result
}

module.exports = {
  getSchemes,
  getPortfolioOverlap
}
