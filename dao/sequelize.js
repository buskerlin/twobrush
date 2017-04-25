const Sequelize = require("sequelize");
const sql = require("./sqlConfig.js").mySql;

//连接数据库
module.exports = new Sequelize(sql.database,sql.user,sql.password,{
	host: sql.host,
	port: sql.port,
	dialect: "mysql"
});
