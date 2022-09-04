const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
//kết nối sequelize tới database
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    logging:false,
});
//Tạo ra object models
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.news= require("./news.model.js")(sequelize, Sequelize);
db.comment = require("./comments.model.js")(sequelize,Sequelize);

db.news.hasMany(db.comment,{foreignKey: 'newId', as: 'comments'});
db.comment.belongsTo(db.news,{foreignKey: 'newId', as: 'new'});
module.exports = db;