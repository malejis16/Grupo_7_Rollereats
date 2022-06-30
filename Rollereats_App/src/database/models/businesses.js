const sequelize = require('../config/config');
var Sequelize = require('sequelize');
const User = require('../models/users');
const Product = require('../models/products')

module.exports = function (sequelize, dataTypes){
    let alias = 'Business';
    let cols = {
        idBusiness: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        businessName:{
            type: dataTypes.STRING,
        },
        businessDeliveryFee: {
            type: dataTypes.BIGINT,
        },
        businessDescription: {
            type: dataTypes.STRING,
        },
        businessProfile: {
            type: dataTypes.STRING,
        },
        idUser: {
            type: dataTypes.INTEGER,
        },
    };
    
    let config = {
        tableName: "businesses",
        timestamps: false,
    };

    let Business = sequelize.define(alias, cols, config);

    Business.associate = function (models){
        Business.belongsTo(models.User, {
            as: "users",
            foreignKey: "idUser",
        });
        Business.hasMany(models.Product, {
            as: "products",
            foreignKey: "idBusiness",
        });
    }
    return Business;
}
