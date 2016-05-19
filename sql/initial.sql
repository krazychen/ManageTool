/*
SQLyog Enterprise v12.09 (64 bit)
MySQL - 5.6.25 : Database - managetool
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`managetool` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `managetool`;

/*Table structure for table `sys_user_session` */

DROP TABLE IF EXISTS `sys_user_session`;

CREATE TABLE `sys_user_session` (
  `session_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8 COLLATE utf8_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='the user session table';

/*Data for the table `sys_user_session` */

insert  into `sys_user_session`(`session_id`,`expires`,`data`) values ('-r7DycFf8DoXBrWYjBVEGqjjPt0CE2CZ',1463559937,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{\"success\":[\"登录成功!\",\"登出成功!\",\"登录成功!\"]},\"user\":{\"name\":\"123\",\"password\":\"202cb962ac59075b964b07152d234b70\",\"email\":\"123@123\"}}'),('64jBKf9rZCA6BcqkN32fRaLxJeSGComS',1463651107,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{\"success\":[\"登录成功!\"]},\"user\":{\"name\":\"123\",\"password\":\"202cb962ac59075b964b07152d234b70\",\"email\":\"123@123\"}}'),('f7aOJFi1-eUeSEAwJ9gMqpN5SHGkfySi',1463581413,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{\"success\":[\"登录成功!\"]},\"user\":{\"name\":\"123\",\"password\":\"202cb962ac59075b964b07152d234b70\",\"email\":\"123@123\"}}');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` tinytext NOT NULL,
  `email` tinytext NOT NULL,
  `password` tinytext NOT NULL,
  `regtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`id`,`name`,`email`,`password`,`regtime`) values (1,'123','123@123','202cb962ac59075b964b07152d234b70','2016-05-12 18:07:50'),(2,'111','111@111.com','698d51a19d8a121ce581499d7b701668','2016-05-12 21:33:23'),(3,'1111','1111@111','b59c67bf196a4758191e42f76670ceba','2016-05-12 21:34:57'),(4,'2222','2222@222','934b535800b1cba8f96a5d72f72f1611','2016-05-12 21:35:37'),(5,'333','333@333','310dcbbf4cce62f762a2aaa148d556bd','2016-05-13 11:25:02');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
