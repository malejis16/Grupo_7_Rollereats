module.exports = function (sequelize, dataTypes){
    let alias = 'Product';
    let cols = {
        idProduct: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productName: {
            type: dataTypes.STRING, 
        },
        productPrice: {
            type: dataTypes.BIGINT,
        },
        productDescription: {
            type: dataTypes.STRING,
        },
        idBusiness: {
            type: dataTypes.INTEGER,
        },
        idCategory: {
            type: dataTypes.INTEGER,
        },
    };

    let config = {
        tableName: "products",
        timestamps: false,
    };

    let Product = sequelize.define(alias, cols, config);

    Product.associate = function (models){
        Product.belongsTo(models.Business, {
            as: "businesses",
            foreignKey: "idBusiness",
        });
        Product.belongsTo(models.Category, {
            as: "categories",
            foreignKey: "idCategory",
        });
        Product.hasMany(models.CartDetail, {
            as: "cartdetail",
            foreignKey: "idProduct",
        });
        // Product.belongsToMany(models.Carts, {
        //     as: "carts",
        //     through: "cartdetail",
        //     foreignKey: "codeSale",
        //     otherKey: "idProduct",
        //     timestamps: false,
        // });
    }
    return Product;
}