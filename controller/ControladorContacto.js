module.exports=function(app){
	return {
		add:function(req,res){
			var pool=app.get('pool');
			pool.getConnection(function(err,connection){
				if(err){
                    connection.release();
                    res.json({"code" : 100, "status" : "Error al conectar a la base de datos"});
                }
				connection.query("INSERT INTO contacto VALUES (NULL,'"+req.body.nombre+"','"+req.body.telCasa+"','"+req.body.telMovil+"','"+req.body.direccion+"','"+req.body.correo+"','"+req.body.idUsuario+"');", function(err, row){
					if(err)
						throw err;
					else
						res.json({"mensaje":"Contacto Agregado"});
					connection.release();	
				});
			});	
		},
		delete:function(req,res){
			var pool=app.get('pool');
			pool.getConnection(function(err,connection){
				if(err){
                    connection.release();
                    res.json({"code" : 100, "status" : "Error al conectar a la base de datos"});
                }
				connection.query("Delete from contacto where idContacto="+req.body.idContacto, function(err, row){
					if(err)
						throw err;
					else
						res.json({"mensaje":"Contacto eliminado"});
					connection.release();	
				});
			});	
		},
		list:function(req,res){
			var pool=app.get('pool');
			pool.getConnection(function(err,connection){
				if(err){
                    connection.release();
                    res.json({"code" : 100, "status" : "Error al conectar a la base de datos"});
                }
				connection.query("Select * from contacto where idUsuario="+req.query.idUsuario, function(err, row){
					if(err)
						throw err;
					else
						res.json(row);
					connection.release();	
				});
			});	
		},
		edit:function(req,res){
			var pool=app.get('pool');
			pool.getConnection(function(err,connection){
				if(err){
                    connection.release();
                    res.json({"code" : 100, "status" : "Error al conectar a la base de datos"});
                }
				connection.query("UPDATE contacto set nombre='"+req.body.nombre+"',telefonoCasa="+req.body.telCasa+",telefonoMovil="+req.body.telMovil+",direccion='"+req.body.direccion+"',correo='"+req.body.correo+"' where idContacto="+req.body.idContacto, function(err, row){
					if(err)
						throw err;
					else
						res.json({"mensaje":"Contacto editado"});
					connection.release();	
				});
			});	
		}
	}
}