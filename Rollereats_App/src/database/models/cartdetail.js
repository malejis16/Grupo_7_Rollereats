module.exports = function (sequelize, dataTypes){
    let alias = 'CartDetail';
    let cols = {
        codeSale: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        idProduct: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        number: {
            type: dataTypes.INTEGER,
        },
    };
    
    let config = {
        tableName: "cartdetail",
        timestamps: false,
    };

    let CartDetail = sequelize.define(alias, cols, config);

    CartDetail.associate = function (models){
        CartDetail.belongsTo(models.Product, {
            as: "products",
            foreignKey: "idProduct",
        });
        CartDetail.belongsTo(models.Cart, {
            as: "cart",
            foreignKey: "codeSale",
        });
    }
    return CartDetail;
}
