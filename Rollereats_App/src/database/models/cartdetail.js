module.exports = function (sequelize, dataTypes){
    let alias = 'CartDetail';
    let cols = {
        idDetail: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        saleSubtotal: {
            type: dataTypes.BIGINT,
        },
        saleAmount: {
            type: dataTypes.BIGINT,
        },
        codeSale: {
            type: dataTypes.INTEGER
        },
        idProduct: {
            type: dataTypes.INTEGER,
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
        CartDetail.belongsTo(models.Carts, {
            as: "carts",
            foreignKey: "codeSale",
        });
        CartDetail.belongsTo(models.Product, {
            as: "products",
            foreignKey: "idProduct",
        });

    }

    return CartDetail;
}