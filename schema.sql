DROP SCHEMA IF EXISTS `story_app`;

CREATE SCHEMA `story_app`;
USE `story_app`;

CREATE TABLE `user` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `is_admin` BOOLEAN NOT NULL DEFAULT FALSE,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` TIMESTAMP NULL
);

ALTER TABLE `user`
ADD UNIQUE (`username`),
ADD UNIQUE (`email`);
