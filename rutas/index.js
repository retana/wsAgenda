var ruta=require('express').Router();
module.exports=(function(modelo){
	var usuario=require('../controller/ControladorUsuario.js')(modelo);
	var contacto=require('../controller/ControladorContacto.js')(modelo);
	ruta.get('/',function(peticion,respuesta){
		respuesta.send("Servicio iniciado");
	});
	
	/*
		Rutas para Usuario
	*/
	ruta.post('/usuario/registro',usuario.registro);
	ruta.post('/usuario/login',usuario.login);
	ruta.get('/prueba',usuario.prueba)
	/*
		Rutas para Contacto
	*/
	ruta.get('/contacto/:id',contacto.list);
	ruta.post('/contacto',contacto.add);
	ruta.put('/contacto/:id',contacto.edit);
	ruta.delete('/contacto/:id',contacto.delete);
	
	return ruta;
});