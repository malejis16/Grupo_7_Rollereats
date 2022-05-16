module.exports = function (sequelize, dataTypes){
    let alias = 'User';
    let cols = {
        idUser: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firtName: {
            type: dataTypes.STRING, 
        },
        lastName: {
            type: dataTypes.STRING,
        },
        address: {
            type: dataTypes.STRING,
        },
        email: {
            type: dataTypes.STRING,
        },
        phone: {
            type: dataTypes.INTEGER,
        },
        password: {
            type: dataTypes.STRING,
        },
        country: {
            type: dataTypes.STRING,
        },
        avatar: {
            type: dataTypes.STRING, /*Type:BLOB*/
        },
        idRole: {
            type:dataTypes.INTEGER,
        }
    };
    
    let config = {
        tableName: "users",
        timestamps: false,
    };

    let User = sequelize.define(alias, cols, config);

    User.associate = function (models){
        User.belongsTo(models.Role, {
            as: "roles",
            foreignKey: "idRole",
        });
        User.hasMany(models.Carts, {
            as: "carts",
            foreignKey: "idUser",
        });
    }
    return User;
}
