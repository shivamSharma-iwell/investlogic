const { scheme, navHistory } = require('../models/portfolioCorrelation.js')
const { QueryTypes } = require('sequelize')
const { ARRAYLENGTH } = require('../constants/index.js')


const getSchemes = async (category) => {
        const schemes = await scheme.sequelize.query(`select distinct(schemes.schid), name from schemes JOIN navHistory on schemes.schid = navHistory.schid JOIN objectives on schemes.objectiveid = objectives.objectiveid where AUMObjective  = '${category}';`, { type: QueryTypes.SELECT })
        if(schemes.length == ARRAYLENGTH){
            throw "Category doesn't exist"
        }
        return schemes
}

const getNavs = async (schid, date) => {
            let navData = await navHistory.sequelize.query(`select nav,navDate,schid from navHistory where navDate >= '${date}' AND schid IN (${schid.join(',')})`)
            navData = navData[0]
            return navData
}

const getLaunchDate = async (schid) => {
        let launchDate = await navHistory.sequelize.query(`select MIN(navDate) AS 'date' from navHistory where schid = ${schid}`)
        launchDate = launchDate[0][0].date

        if (launchDate == null) {
            throw "Scheme ID doesn't exist"
        }
        return launchDate
}

module.exports = {
    getSchemes,
    getNavs,
    getLaunchDate
}