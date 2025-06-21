CREATE USER IF NOT EXISTS 'talia'@'localhost' IDENTIFIED BY '123456789';
GRANT ALL PRIVILEGES ON project.* TO 'talia'@'localhost';
FLUSH PRIVILEGES;

CREATE DATABASE  IF NOT EXISTS `project` ;
USE `project`;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
);

DROP TABLE IF EXISTS `list_items`;
CREATE TABLE `list_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `list_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)