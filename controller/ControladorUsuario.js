var jwt=require('jsonwebtoken');
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
			modelo.sequelize.query("CALL sp_autenticarUsuario('"+peticion.body.correo+"', '"+peticion.body.contrasena+"');").then(function(user){
					if(user.length>0)
						respuesta.json(genToken(user));
					else
						respuesta.json({"user":[]});
			}).error(function(err){
				respuesta.send({"mensaje":"Error "+err,"status":"500"});
			});
		},
		tokenGenerator:function(req,res){
			var token=jwt.sign({company:'Kinal'},'S3CUR3@APP');
			res.send(token);
		},
		tokenMiddleware:function(req,res,next){
			var token=req.headers['x-access-token'] || req.body.token || req.query.token;
			if(token){
				jwt.verify(token,'S3CUR3@APP',function(err,decoded){
					if(err){
						return res.status(403).send({
							success:false,
							message:'Fallo al validar token'
						});
					}
					req.user=decoded;
					next();
				});
			}else{
				return res.status(403).send({
					success:false,
					message:'No se proporciono token'
				});
			}
		}
	}
}
function expiresIn(dias){
	var dateObj=new Date();
	return dateObj.setDate(dateObj.getDate()+dias);
}
function genToken(user){
	var payload=jwt.sign({
			"company":"Kinal"
		},
		'S3CUR3@APP');
	var token={
		"token":payload,
		"user":user,
		"exp": expiresIn(1)
	}
	return token;
}