const fs = require('fs')
const path = require('path')
const { Sequelize, DataTypes } = require('sequelize')
const basename = path.basename(module.filename)
const config = require(__dirname + '/../config/db.json').mysql
const sequelize = new Sequelize(config.database, null, null, config)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully....')
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error)
  })

const scheme = sequelize.define('scheme', {
    fundid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    schid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fsid: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: 'schemes'
  }
)

const schemeholding = sequelize.define('schemeHolding',{
    holdingid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    holdings: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    netAsset: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    fsid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'schemeHolding'
  }
)

const schemedetail = sequelize.define('schemeDetail',{
    schid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    orgsch: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'schemeDetails'
  }
)

sequelize
  .sync()
  .then(() => {
    console.log('Table created successfully!')
  })
  .catch((error) => {
    console.error('Unable to create table : ', error)
  })


scheme.sequelize = sequelize
scheme.Sequelize = Sequelize

schemeholding.sequelize = sequelize
schemeholding.Sequelize = Sequelize

schemedetail.sequelize = sequelize
schemedetail.Sequelize = Sequelize

module.exports = { scheme, schemeholding, schemedetail, sequelize }
