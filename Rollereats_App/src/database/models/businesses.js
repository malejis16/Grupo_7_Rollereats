module.exports = function (sequelize, dataTypes){
    let alias = 'Business';
    let cols = {
        idBusiness: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        businessName: {
            type: dataTypes.STRING,
        },
        businessEmail1: {
            type: dataTypes.STRING,
        },
        businessEmail2: {
            type: dataTypes.STRING,
        },
        businessPhone1: {
            type: dataTypes.INTEGER,
        },
        businessPhone2: {
            type: dataTypes.INTEGER,
        },
        businessTime: {
            type: dataTypes.INTEGER,
        },
        businessDescription: {
            type: dataTypes.STRING,
        },
        businessProfile: {
            type: dataTypes.STRING, /*Imagen*/
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
            /*Me falta la relacion de products - Bussineses*/
        });
    }
    return Business;
}
