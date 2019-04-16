-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema abc-corp
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema abc-corp
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `abc-corp` DEFAULT CHARACTER SET utf8 ;
USE `abc-corp` ;

-- -----------------------------------------------------
-- Table `abc-corp`.`city`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `abc-corp`.`city` (
  `city_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`city_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `abc-corp`.`state`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `abc-corp`.`state` (
  `state_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`state_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `abc-corp`.`country`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `abc-corp`.`country` (
  `country_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`country_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `abc-corp`.`location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `abc-corp`.`location` (
  `location_id` INT NOT NULL AUTO_INCREMENT,
  `location_name` VARCHAR(45) NULL,
  `address` VARCHAR(45) NULL,
  `city_id` INT NOT NULL,
  `state_id` INT NOT NULL,
  `country_id` INT NOT NULL,
  PRIMARY KEY (`location_id`),
  INDEX `fk_location_city1_idx` (`city_id` ASC) VISIBLE,
  INDEX `fk_location_state1_idx` (`state_id` ASC) VISIBLE,
  INDEX `fk_location_country1_idx` (`country_id` ASC) VISIBLE,
  CONSTRAINT `fk_location_city1`
    FOREIGN KEY (`city_id`)
    REFERENCES `abc-corp`.`city` (`city_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_location_state1`
    FOREIGN KEY (`state_id`)
    REFERENCES `abc-corp`.`state` (`state_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_location_country1`
    FOREIGN KEY (`country_id`)
    REFERENCES `abc-corp`.`country` (`country_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `abc-corp`.`office`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `abc-corp`.`office` (
  `office_id` INT NOT NULL AUTO_INCREMENT,
  `floor_numbers` INT NULL,
  `location_id` INT NOT NULL,
  PRIMARY KEY (`office_id`),
  INDEX `fk_office_location1_idx` (`location_id` ASC) VISIBLE,
  CONSTRAINT `fk_office_location1`
    FOREIGN KEY (`location_id`)
    REFERENCES `abc-corp`.`location` (`location_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `abc-corp`.`employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `abc-corp`.`employee` (
  `employee_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(50) NULL,
  `email` VARCHAR(75) NULL,
  `phone_number` VARCHAR(15) NULL,
  `active` TINYINT NULL,
  `last_update` TIMESTAMP NULL DEFAULT CURRENT TIMESTAMP,
  `office_id` INT NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE INDEX `employee_id_UNIQUE` (`employee_id` ASC) VISIBLE,
  INDEX `fk_employee_office1_idx` (`office_id` ASC) VISIBLE,
  CONSTRAINT `fk_employee_office1`
    FOREIGN KEY (`office_id`)
    REFERENCES `abc-corp`.`office` (`office_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `abc-corp`.`reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `abc-corp`.`reservation` (
  `reservation_id` INT NOT NULL AUTO_INCREMENT,
  `reservation_name` VARCHAR(45) NULL,
  `room_id` INT NULL,
  `reservation_start` DATETIME NULL,
  `reservation_end` DATETIME NULL,
  PRIMARY KEY (`reservation_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `abc-corp`.`room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `abc-corp`.`room` (
  `room_id` INT NOT NULL AUTO_INCREMENT,
  `floor_number` INT NULL,
  `max_attendees` INT NULL,
  `in_use` TINYINT NULL,
  `smart_enabled` TINYINT NULL,
  `reservation_id` INT NOT NULL,
  `office_id` INT NOT NULL,
  PRIMARY KEY (`room_id`),
  INDEX `fk_room_reservation_idx` (`reservation_id` ASC) VISIBLE,
  INDEX `fk_room_office1_idx` (`office_id` ASC) VISIBLE,
  CONSTRAINT `fk_room_reservation`
    FOREIGN KEY (`reservation_id`)
    REFERENCES `abc-corp`.`reservation` (`reservation_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_room_office1`
    FOREIGN KEY (`office_id`)
    REFERENCES `abc-corp`.`office` (`office_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `abc-corp`.`vendor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `abc-corp`.`vendor` (
  `vendor_id` INT NOT NULL AUTO_INCREMENT,
  `vendor_name` VARCHAR(45) NULL,
  `location_id` INT NOT NULL,
  PRIMARY KEY (`vendor_id`),
  INDEX `fk_vendor_location1_idx` (`location_id` ASC) VISIBLE,
  CONSTRAINT `fk_vendor_location1`
    FOREIGN KEY (`location_id`)
    REFERENCES `abc-corp`.`location` (`location_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `abc-corp`.`equipment-type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `abc-corp`.`equipment-type` (
  `equipment_type_id` INT NOT NULL AUTO_INCREMENT,
  `type_name` VARCHAR(45) NULL,
  PRIMARY KEY (`equipment_type_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `abc-corp`.`contract_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `abc-corp`.`contract_type` (
  `contract_type_id` INT NOT NULL AUTO_INCREMENT,
  `contract_name` VARCHAR(45) NULL,
  PRIMARY KEY (`contract_type_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `abc-corp`.`equipment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `abc-corp`.`equipment` (
  `equipment_id` INT NOT NULL AUTO_INCREMENT,
  `last_update` DATETIME NULL,
  `expire_date` DATETIME NULL,
  `vendor_id` INT NOT NULL,
  `employee_id` INT UNSIGNED NOT NULL,
  `equipment_type_id` INT NOT NULL,
  `contract_type_id` INT NOT NULL,
  `office_id` INT NOT NULL,
  PRIMARY KEY (`equipment_id`),
  INDEX `fk_equipment_vendor1_idx` (`vendor_id` ASC) VISIBLE,
  INDEX `fk_equipment_employee1_idx` (`employee_id` ASC) VISIBLE,
  INDEX `fk_equipment_equipment-type1_idx` (`equipment_type_id` ASC) VISIBLE,
  INDEX `fk_equipment_contract_type1_idx` (`contract_type_id` ASC) VISIBLE,
  INDEX `fk_equipment_office1_idx` (`office_id` ASC) VISIBLE,
  CONSTRAINT `fk_equipment_vendor1`
    FOREIGN KEY (`vendor_id`)
    REFERENCES `abc-corp`.`vendor` (`vendor_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_equipment_employee1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `abc-corp`.`employee` (`employee_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_equipment_equipment-type1`
    FOREIGN KEY (`equipment_type_id`)
    REFERENCES `abc-corp`.`equipment-type` (`equipment_type_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_equipment_contract_type1`
    FOREIGN KEY (`contract_type_id`)
    REFERENCES `abc-corp`.`contract_type` (`contract_type_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_equipment_office1`
    FOREIGN KEY (`office_id`)
    REFERENCES `abc-corp`.`office` (`office_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `abc-corp`.`equipment_reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `abc-corp`.`equipment_reservation` (
  `reservation_id` INT NOT NULL,
  `equipment_id` INT NOT NULL,
  PRIMARY KEY (`reservation_id`, `equipment_id`),
  INDEX `fk_equipment_reservation_reservation1_idx` (`reservation_id` ASC) VISIBLE,
  INDEX `fk_equipment_reservation_equipment1_idx` (`equipment_id` ASC) VISIBLE,
  CONSTRAINT `fk_equipment_reservation_reservation1`
    FOREIGN KEY (`reservation_id`)
    REFERENCES `abc-corp`.`reservation` (`reservation_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_equipment_reservation_equipment1`
    FOREIGN KEY (`equipment_id`)
    REFERENCES `abc-corp`.`equipment` (`equipment_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
