module.exports = function (sequelize, dataTypes){
    let alias = 'Carts';
    let cols = {
        codeSale: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        saleDate: {
            type: dataTypes.DATE, /* type Datetime*/
        },
        idUser: {
            type: dataTypes.INTEGER,
        },
    };

    let config = {
        tableName: "carts",
        timestamps: false,
    };

    let Carts = sequelize.define(alias, cols, config);

    Carts.associate = function (models){
        Carts.belongsTo(models.User, {
            as: "users",
            foreignKey: "idUser",
        });
        Carts.belongsToMany(models.Product, {
            as: "products",
            through: "cartdetail",
            foreignKey: "codeSale",
            otherKey: "idProduct",
            timestamps: false,
        });
    }
    return Carts;
}
