/*
SQLyog Ultimate v9.02 
MySQL - 5.6.21 : Database - db_agendatelefonica
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_agendatelefonica` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `db_agendatelefonica`;

/*Table structure for table `contacto` */

DROP TABLE IF EXISTS `contacto`;

CREATE TABLE `contacto` (
  `idContacto` int(10) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(128) DEFAULT NULL,
  `telefonoCasa` int(15) DEFAULT NULL,
  `telefonoMovil` int(15) DEFAULT NULL,
  `direccion` varchar(64) DEFAULT NULL,
  `correo` varchar(128) DEFAULT NULL,
  `idUsuario` int(10) DEFAULT NULL,
  PRIMARY KEY (`idContacto`),
  KEY `FK_contacto` (`idUsuario`),
  CONSTRAINT `FK_contacto` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `contacto` */

insert  into `contacto`(`idContacto`,`nombre`,`telefonoCasa`,`telefonoMovil`,`direccion`,`correo`,`idUsuario`) values (1,'Maria Saenz',65465465,456465465,'Guatemala,Guatemala','saenz@correo.com',1);

/*Table structure for table `usuario` */

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `idUsuario` int(10) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(128) DEFAULT NULL,
  `correo` varchar(64) DEFAULT NULL,
  `nick` varchar(128) DEFAULT NULL,
  `contraseña` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

/*Data for the table `usuario` */

insert  into `usuario`(`idUsuario`,`nombre`,`correo`,`nick`,`contraseña`) values (1,'Francisco Antonio Retana Barco','inforetana@gmail.com','retana','fe01ce2a7fbac8fafaed7c982a04e229'),(2,'Juan Perez','jp@mail.com','juan','900150983cd24fb0d6963f7d28e17f72'),(9,'Edwin Tumax','edwintumax@gmail.com','edwin','e515df0d202ae52fcebb14295743063b'),(10,'Prueba','p@gmail.com','p','83878c91171338902e0fe0fb97a8c47a'),(11,'user1','user1@correo.com','user1','202cb962ac59075b964b07152d234b70'),(12,'user1','user1@correo.com','user1','202cb962ac59075b964b07152d234b70'),(13,'user1','user1@correo.com','user1','202cb962ac59075b964b07152d234b70'),(14,'user1','user1@correo.com','user1','202cb962ac59075b964b07152d234b70'),(15,'user1','user1@correo.com','user1','202cb962ac59075b964b07152d234b70');

/* Procedure structure for procedure `sp_autenticarUsuario` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_autenticarUsuario` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_autenticarUsuario`(IN _nick varchar(128),in _contrasena varchar(128))
BEGIN
	select nombre,correo,nick from usuario where usuario.`nick`=_nick and usuario.`contraseña`=md5(_contrasena);
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_listacontactos` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_listacontactos` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_listacontactos`(in _idUsuario int)
BEGIN
	SELECT contacto.idContacto,contacto.nombre,contacto.correo,contacto.direccion,contacto.nombre,contacto.telefonoCasa,contacto.telefonoMovil,usuario.nombre AS usuario,usuario.idUsuario FROM contacto 
	LEFT JOIN usuario ON usuario.idUsuario=contacto.idUsuario 
	where usuario.idUsuario=_idUsuario;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_registroUsuario` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_registroUsuario` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_registroUsuario`(IN _nombre varchar(128),IN _correo varchar(128),in _nick varchar(128),_contraseña varchar(128))
BEGIN
	insert into usuario values(null,_nombre,_correo,_nick,md5(_contraseña));
    END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
