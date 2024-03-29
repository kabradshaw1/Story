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
  `date_modified` TIMESTAMP NULL,
  UNIQUE (`username`),
  UNIQUE (`email`)
);

CREATE TABLE `characters` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `body` MEDIUMTEXT NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` TIMESTAMP NULL,
  UNIQUE (`title`)
);

CREATE TABLE `timeline` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(255) NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` TIMESTAMP NULL,
  `timeline` INT NOT NULL
);

CREATE TABLE `scenes` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `body` MEDIUMTEXT NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` TIMESTAMP NULL,
  `timeline_start_id` BIGINT,
  `timeline_end_id` BIGINT,
  FOREIGN KEY (`timeline_start_id`) REFERENCES `timeline` (`id`),
  FOREIGN KEY (`timeline_end_id`) REFERENCES `timeline` (`id`),
  UNIQUE (`title`)
);

CREATE TABLE `regions` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `body` MEDIUMTEXT NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` TIMESTAMP NULL,
  UNIQUE (`title`)
);

CREATE TABLE `organizations` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `body` MEDIUMTEXT NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` TIMESTAMP NULL,
  UNIQUE (`title`)
);

CREATE TABLE `locations` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `body` MEDIUMTEXT NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` TIMESTAMP NULL,
  UNIQUE (`title`)
);

CREATE TABLE `conflicts` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `body` MEDIUMTEXT NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` TIMESTAMP NULL,
  UNIQUE (`title`)
);

CREATE TABLE `character_scene` (
  `character_id` BIGINT NOT NULL,
  `scene_id` BIGINT NOT NULL,
  PRIMARY KEY (`character_id`, `scene_id`),
  FOREIGN KEY (`character_id`) REFERENCES `characters` (`id`),
  FOREIGN KEY (`scene_id`) REFERENCES `scenes` (`id`)
);

CREATE TABLE `character_conflict` (
  `character_id` BIGINT NOT NULL,
  `conflict_id` BIGINT NOT NULL,
  PRIMARY KEY (`character_id`, `conflict_id`),
  FOREIGN KEY (`character_id`) REFERENCES `characters` (`id`),
  FOREIGN KEY (`conflict_id`) REFERENCES `conflicts` (`id`)
);

CREATE TABLE `character_organization` (
  `character_id` BIGINT NOT NULL,
  `organization_id` BIGINT NOT NULL,
  PRIMARY KEY (`character_id`, `organization_id`),
  FOREIGN KEY (`character_id`) REFERENCES `characters` (`id`),
  FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`)
);

CREATE TABLE `region_organization` (
  `region_id` BIGINT NOT NULL,
  `organization_id` BIGINT NOT NULL,
  PRIMARY KEY (`region_id`, `organization_id`),
  FOREIGN KEY (`region_id`) REFERENCES `regions` (`id`),
  FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`)
);

CREATE TABLE `organization_location` (
  `location_id` BIGINT NOT NULL,
  `organization_id` BIGINT NOT NULL,
  PRIMARY KEY (`location_id`, `organization_id`),
  FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`),
  FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`)
);

CREATE TABLE `organization_scene` (
  `scene_id` BIGINT NOT NULL,
  `organization_id` BIGINT NOT NULL,
  PRIMARY KEY (`organization_id`, `scene_id`),
  FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`),
  FOREIGN KEY (`scene_id`) REFERENCES `scenes` (`id`)
);