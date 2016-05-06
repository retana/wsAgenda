module.exports=function(modelo){
	return {
		prueba:function(req,res){
			modelo.usuario.findAll().then(function(data){
					res.json(data);
			});
		},
		registro:function(peticion,respuesta){
				modelo.sequelize.query("CALL sp_registroUsuario('"+peticion.body.nombre+"','"+peticion.body.correo+"','"+peticion.body.nick+"','"+peticion.body.contrasena+"');")
				.then(function(){
					respuesta.send({"mensaje":"Registro insertado correctamente","status":"200"});
				}).error(function(err){
					respuesta.send({"mensaje":"Error "+err,"status":"500"});
				});
		},
		login:function(peticion,respuesta){			
			modelo.sequelize.query("CALL sp_autenticarUsuario('"+peticion.body.nombre+"', '"+peticion.body.contrasena+"');").then(function(data){
					respuesta.json(data);
			}).error(function(err){
				respuesta.send({"mensaje":"Error "+err,"status":"500"});
			});
		}
	}
}