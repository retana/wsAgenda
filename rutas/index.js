var ruta=require('express').Router();
module.exports=(function(app){
	var usuario=require('../controller/ControladorUsuario.js')(app);
	var contacto=require('../controller/ControladorContacto.js')(app);
	ruta.get('/',function(peticion,respuesta){
		respuesta.send("Servicio iniciado");
	});
	
	/*
		Rutas para Usuario
	*/
	ruta.post('/usuario/registro',usuario.registro);
	ruta.post('/usuario/login',usuario.login);
	/*
		Rutas para Contacto
	*/
	ruta.get('/contacto',contacto.list);
	ruta.post('/contacto',contacto.add);
	ruta.put('/contacto',contacto.edit);
	ruta.delete('/contacto',contacto.delete);
	
	return ruta;
});