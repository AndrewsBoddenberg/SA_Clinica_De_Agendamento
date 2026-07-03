-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema praVoce_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema praVoce_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `praVoce_db` DEFAULT CHARACTER SET utf8 ;
USE `praVoce_db` ;

-- -----------------------------------------------------
-- Table `praVoce_db`.`pacientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `praVoce_db`.`pacientes` (
  `idpacientes` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `senha` VARCHAR(150) NOT NULL,
  `cpf` VARCHAR(14) NOT NULL,
  `telefone` VARCHAR(15) NOT NULL,
  `dataNascimento` DATE NOT NULL,
  PRIMARY KEY (`idpacientes`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `praVoce_db`.`medicos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `praVoce_db`.`medicos` (
  `idmedicos` INT NOT NULL AUTO_INCREMENT,
  `nome_medico` VARCHAR(150) NOT NULL,
  `especialidade` VARCHAR(45) NOT NULL,
  `dia_disponivel` DATE NOT NULL,
  `hora_disponivel` TIME NOT NULL,
  `status` ENUM('Disponivel', 'Ocupado') NOT NULL,
  PRIMARY KEY (`idmedicos`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `praVoce_db`.`agendamentos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `praVoce_db`.`agendamentos` (
  `idagendamentos` INT NOT NULL AUTO_INCREMENT,
  `status_consulta` ENUM('Confirmado', 'Cancelado') NOT NULL,
  `pacientes_idpacientes` INT NOT NULL,
  `medicos_idmedicos` INT NOT NULL,
  PRIMARY KEY (`idagendamentos`),
  INDEX `fk_agendamentos_pacientes_idx` (`pacientes_idpacientes` ASC) VISIBLE,
  INDEX `fk_agendamentos_medicos1_idx` (`medicos_idmedicos` ASC) VISIBLE,
  CONSTRAINT `fk_agendamentos_pacientes`
    FOREIGN KEY (`pacientes_idpacientes`)
    REFERENCES `praVoce_db`.`pacientes` (`idpacientes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_agendamentos_medicos1`
    FOREIGN KEY (`medicos_idmedicos`)
    REFERENCES `praVoce_db`.`medicos` (`idmedicos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO `praVoce_db`.`pacientes` (`nome`, `email`, `senha`, `cpf`, `telefone`, `dataNascimento`) VALUES 
('Ana Souza Silva', 'ana.souza@email.com', 'senhaSegura123', '123.456.789-00', '(11) 98765-4321', '1990-05-15'),
('Carlos Eduardo Gomes', 'carlos.gomes@email.com', 'carlos@2026', '987.654.321-11', '(21) 99888-7766', '1985-11-22'),
('Mariana Costa Oliveira', 'mari.costa@email.com', 'mari#p@ssword', '456.789.123-22', '(31) 98654-1234', '1998-03-08'),
('Lucas Rodrigues Santos', 'lucas.santos@email.com', 'lucas@vqv2026', '234.567.890-44', '(41) 99123-4567', '2001-07-30'),
('Beatriz Araujo Lima', 'bia.lima@email.com', 'beatriz*lima99', '345.678.901-55', '(81) 98234-5678', '1975-12-01');