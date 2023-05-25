const Sequelize = require('sequelize')
const config = require(__dirname + '/../config/db.json').mysql
let sequelize = null
sequelize = new Sequelize(config.database, null, null, config)

sequelize.authenticate().then(() => {
  console.log("connection established")
}).catch((error) => {
  console.error("Connection error", error)
})



const scheme = sequelize.define('schemes', {
  fundid: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  schid: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    primaryKey: false
  },
  name: {
    type: Sequelize.DataTypes.STRING(150),
    allowNull: true
  },
  iwellCode: {
    type: Sequelize.DataTypes.STRING(20),
    allowNull: true,
    unique: true
  },
  camsCode1: {
    type: Sequelize.DataTypes.STRING(15),
    allowNull: true
  },
  camsCode2: {
    type: Sequelize.DataTypes.STRING(15),
    allowNull: true
  },
  fsid: {
    type: Sequelize.DataTypes.STRING(50),
    allowNull: true
  },
  objectiveid: {
    type: Sequelize.DataTypes.INTEGER(5),
    allowNull: true
  },
  productType: {
    type: Sequelize.DataTypes.CHAR(2),
    allowNull: true
  }
})

const navHistory = sequelize.define('navHistory', {
  schid: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  navDate: {
    type: Sequelize.DataTypes.DATEONLY,
    allowNull: true
  },
  nav: {
    type: Sequelize.DataTypes.FLOAT(18, 4),
    allowNull: true
  },
  iwellCode: {
    type: Sequelize.DataTypes.STRING(20),
    allowNull: false
  },
  age: {
    type: Sequelize.DataTypes.CHAR(1),
    allowNull: true
  },
  isNew: {
    type: Sequelize.DataTypes.INTEGER(1),
    allowNull: true,
    defaultValue: '0'
  },
  manual: {
    type: Sequelize.DataTypes.INTEGER(1),
    allowNull: true
  }
})

sequelize.sync().then(() => {
}).catch((error) => {
  console.error("Unable to sync table", error)
})

scheme.Sequelize = Sequelize
navHistory.Sequelize = Sequelize

module.exports = {
  scheme,
  navHistory,
  sequelize
}