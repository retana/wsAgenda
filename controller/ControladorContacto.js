module.exports=function(modelo){
	return {
		add:function(req,res){
			modelo.contacto.create({
				idContacto: null,
				nombre:req.body.nombre,
				telefonoCasa:req.body.telCasa,
				telefonoMovil:req.body.telMovil,
				direccion:req.body.direccion,
				correo:req.body.correo,
				idUsuario: req.body.idUsuario
			}).then(function(){
					res.json({"mensaje":"Contacto Agregado"});
			}).error(function(err){
					res.json({"mensaje":"El Contacto no se pudo agregar, si esto continua comuniquese con el administrador."});
				throw err;
			});
		},
		delete:function(req,res){
			modelo.contacto.destroy({
				where:{
					idContacto: req.params.id
				}
			}).then(function(){
				res.json({"mensaje":"Contacto eliminado"});
			}).error(function(){
				throw err;
			});			
		},
		list:function(req,res){
			modelo.contacto.findAll({
				where:{
					idUsuario: req.params.id
				}
			}).then(function(data){
				res.json(data);
			}).error(function(){
				res.json({"mensaje":"Error al listar contactos","status":500});
			});
		},
		edit:function(req,res){
			modelo.contacto.find({
				where:{
					idContacto:req.params.id
				}
			}).then(function(contacto){
				if(contacto){
					contacto.updateAttributes({
						nombre:req.body.nombre,
						telefonoCasa:req.body.telCasa,
						telefonoMovil:req.body.telMovil,
						direccion:req.body.direccion,
						correo:req.body.correo,
					}).then(function(contacto){
						res.json({"mensaje":"El contacto "+contacto.nombre+" fue modificado de manera correcta."});
					});
				}
			}).error(function(error){
						res.json({"mensaje":"El contacto no se pudo editar "+error,"status":500});
			});
		}
	}
}