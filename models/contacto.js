/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('contacto', {
		idContacto: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		nombre: {
			type: DataTypes.STRING,
			allowNull: true
		},
		telefonoCasa: {
			type: DataTypes.INTEGER(15),
			allowNull: true
		},
		telefonoMovil: {
			type: DataTypes.INTEGER(15),
			allowNull: true
		},
		direccion: {
			type: DataTypes.STRING,
			allowNull: true
		},
		correo: {
			type: DataTypes.STRING,
			allowNull: true
		},
		idUsuario: {
			type: DataTypes.INTEGER(10),
			allowNull: true,
			references: {
				model: 'usuario',
				key: 'idUsuario'
			}
		}
	}, {
		tableName: 'contacto',
		timestamps:false
	});
};
