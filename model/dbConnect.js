const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes} = require("sequelize");

// const Sequelize = new Sequelize();

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases: false,    //if errors in your code will overwrite code if error occurs
    });

    sequelize
    .authenticate()
    //promise
    .then(()=> {
        console.log("Database Connection Successful...");
    })

    .catch((err) =>{
        console.log("Error"+ err);
    });

    const db ={};

    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    db.student = require("./studentModel")(sequelize,DataTypes);

    module.exports = db;