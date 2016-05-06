/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('usuario', {
		idUsuario: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		nombre: {
			type: DataTypes.STRING,
			allowNull: true
		},
		correo: {
			type: DataTypes.STRING,
			allowNull: true
		},
		nick: {
			type: DataTypes.STRING,
			allowNull: true
		},
		contraseña: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'usuario',
		timestamps:false
	});
};
