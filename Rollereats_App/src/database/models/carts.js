module.exports = function (sequelize, dataTypes){
    let alias = 'Carts';
    let cols = {
        codeSale: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        saleAmount: {
            type: dataTypes.INTEGER, 
        },
        saleDate: {
            type: dataTypes.INTEGER, /* type Datetime*/
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
        /*faltaria definir la relacion con la tabla detalle del carrito*/
        Carts.belongsToMany(models.Product, {
            as: "products",
            through: "cartdetail",
            foreignKey: "codeSale",
            otherKey: "idProduct",
            timestamps: false,
        }); /*Revision de este ultimo item con la opcion de eliminar el modelo cartDetails*/
    }
    return Carts;
}
