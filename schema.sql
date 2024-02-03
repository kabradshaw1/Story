DROP SCHEMA IF EXISTS `story_app`;

CREATE SCHEMA `story_app`;
USE `story_app`;

CREATE TABLE `users` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `is_admin` BOOLEAN NOT NULL DEFAULT FALSE,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` TIMESTAMP NULL
);

CREATE TABLE `character` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `bio` VARCHAR(20000) NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` TIMESTAMP NULL
)

CREATE TABLE `scene` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `body` VARCHAR(20000) NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` TIMESTAMP NULL
);

CREATE TABLE `character_scene` (
  `character_id` BIGINT NOT NULL,
  `scene_id` BIGINT NOT NULL,
  PRIMARY KEY (`character_id`, `scene_id`),
  FOREIGN KEY (`character_id`) REFERENCES `character` (`id`),
  FOREIGN KEY (`scene_id`) REFERENCES `scene` (`id`)
);

ALTER TABLE `users`
ADD UNIQUE (`username`),
ADD UNIQUE (`email`);
