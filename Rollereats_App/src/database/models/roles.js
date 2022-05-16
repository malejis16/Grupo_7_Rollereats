module.exports = function (sequelize, dataTypes){
    let alias = 'Roles';
    let cols = {
        idRole: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role: {
            type: dataTypes.STRING,
        },
    };

    let config = {
        tableName: "roles",
        timestamps: false,
    };

    let Roles = sequelize.define(alias, cols, config);

    Roles.associate = function (models){
        Roles.hasMany(models.User, {
            as: "users",
            foreignKey: "idRole",
        });
    }
    return Roles;
}
