module.exports = function (sequelize, dataTypes){
    let alias = 'Category';
    let cols = {
        idCategory: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category: {
            type: dataTypes.STRING, 
        },
    };
    
    let config = {
        tableName: "categories",
        timestamps: false,
    };

    let Category = sequelize.define(alias, cols, config);

    Category.associate = function (models){
        Category.hasMany(models.Product, {
            as: "products",
            foreignKey: "idCategory",
        });
    }
    return Category;
}
