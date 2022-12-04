const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const cls = require('cls-hooked')
const basename = path.basename(__filename)
const db = {}

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3'
})

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize)
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

const namespace = cls.createNamespace('deel-backend')
Sequelize.useCLS(namespace)

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db