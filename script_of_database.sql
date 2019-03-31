ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

CREATE SCHEMA `send_message` DEFAULT CHARACTER SET utf8 ;
USE `send_message`;

CREATE TABLE `send_message`.`users` (
  `id` INT(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(180) NOT NULL,
  `cpf` VARCHAR(11) NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_users_cpf` (`cpf` ASC)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

CREATE TABLE `send_message`.`contacts` (
  `id` BIGINT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_user` INT(8) UNSIGNED NOT NULL,
  `type` ENUM('PHONE', 'EMAIL') NOT NULL,
  `value` VARCHAR(255) NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_contacts_id_user` (`id_user` ASC),
  INDEX `idx_contacts_type` (`type` ASC),
  INDEX `idx_contacts_value` (`value` ASC),
  CONSTRAINT fk_contacts_id_user FOREIGN KEY (id_user) REFERENCES `users`(id)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

INSERT INTO `send_message`.`users` (`id`, `name`, `cpf`, `created_at`) VALUES
('1', 'Hugo Santos Oliveira', '11848131674', now());

INSERT INTO `send_message`.`contacts` (`id_user`, `type`, `value`, `created_at`) VALUES
('1', 'EMAIL', 'hugosantos_oliveira@hotmail.com', now());

CREATE TABLE `send_message`.`schedules` (
  `id` BIGINT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `plataform` ENUM('EMAIL', 'WHATSAPP', 'FACEBOOK') NOT NULL,
  `type_of_time` ENUM('MINUTE', 'HOUR', 'DAY') NOT NULL,
  `time` MEDIUMINT(6) NOT NULL,
  `subject` VARCHAR(50) NOT NULL,
  `message` VARCHAR(5000) NOT NULL,
  `to` TEXT NOT NULL,
  `cc` TEXT NULL,
  `cco` TEXT NULL,
  `start_date` DATETIME NOT NULL,
  `end_date` DATETIME NULL,
  `is_active` BIT(1) NOT NULL DEFAULT 0,
  `last_executed_at` DATETIME NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL,
  `deleted_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_schedules_plataform` (`plataform` ASC),
  INDEX `idx_schedules_is_active` (`is_active` ASC)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;
