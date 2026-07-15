-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS;
SET UNIQUE_CHECKS = 0;

SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS = 0;

SET @OLD_SQL_MODE = @@SQL_MODE;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- =====================================================
-- CRIAÇÃO DO BANCO
-- =====================================================

CREATE SCHEMA IF NOT EXISTS `praVoce_db` DEFAULT CHARACTER SET utf8;
USE `praVoce_db`;

-- =====================================================
-- TABELA PACIENTES
-- =====================================================

CREATE TABLE IF NOT EXISTS `pacientes` (

    `idpacientes` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `senha` VARCHAR(150) NOT NULL,
    `cpf` VARCHAR(14) NOT NULL,
    `telefone` VARCHAR(15) NOT NULL,
    `dataNascimento` DATE NOT NULL,

    PRIMARY KEY (`idpacientes`),

    UNIQUE (`email`),
    UNIQUE (`cpf`)

) ENGINE=InnoDB;

-- =====================================================
-- TABELA MÉDICOS
-- =====================================================

CREATE TABLE IF NOT EXISTS `medicos` (

    `idmedicos` INT NOT NULL AUTO_INCREMENT,
    `nome_medico` VARCHAR(150) NOT NULL,
    `especialidade` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`idmedicos`)

) ENGINE=InnoDB;

-- =====================================================
-- TABELA HORÁRIOS DOS MÉDICOS
-- =====================================================

CREATE TABLE IF NOT EXISTS `horarios_medicos` (

    `idhorario` INT NOT NULL AUTO_INCREMENT,

    `medicos_idmedicos` INT NOT NULL,

    `dia` DATE NOT NULL,

    `hora` TIME NOT NULL,

    `status` ENUM('Disponivel','Ocupado') NOT NULL DEFAULT 'Disponivel',

    PRIMARY KEY (`idhorario`),

    INDEX (`medicos_idmedicos`),

    CONSTRAINT `fk_horario_medico`
        FOREIGN KEY (`medicos_idmedicos`)
        REFERENCES `medicos`(`idmedicos`)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB;

-- =====================================================
-- TABELA AGENDAMENTOS
-- =====================================================

CREATE TABLE IF NOT EXISTS `agendamentos` (

    `idagendamentos` INT NOT NULL AUTO_INCREMENT,

    `status_consulta` ENUM('Confirmado','Cancelado') NOT NULL,

    `pacientes_idpacientes` INT NOT NULL,

    `horarios_idhorario` INT NOT NULL,

    PRIMARY KEY (`idagendamentos`),

    INDEX (`pacientes_idpacientes`),

    INDEX (`horarios_idhorario`),

    CONSTRAINT `fk_agendamento_paciente`
        FOREIGN KEY (`pacientes_idpacientes`)
        REFERENCES `pacientes`(`idpacientes`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT `fk_agendamento_horario`
        FOREIGN KEY (`horarios_idhorario`)
        REFERENCES `horarios_medicos`(`idhorario`)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- =====================================================
-- PACIENTES
-- =====================================================

INSERT INTO pacientes (nome,email,senha,cpf,telefone,dataNascimento) VALUES

('Ana Souza Silva','ana.souza@email.com','senhaSegura123','123.456.789-00','(11) 98765-4321','1990-05-15'),

('Carlos Eduardo Gomes','carlos.gomes@email.com','carlos@2026','987.654.321-11','(21) 99888-7766','1985-11-22'),

('Mariana Costa Oliveira','mari.costa@email.com','mari#p@ssword','456.789.123-22','(31) 98654-1234','1998-03-08'),

('Lucas Rodrigues Santos','lucas.santos@email.com','lucas@vqv2026','234.567.890-44','(41) 99123-4567','2001-07-30'),

('Beatriz Araujo Lima','bia.lima@email.com','beatriz*lima99','345.678.901-55','(81) 98234-5678','1975-12-01');

-- =====================================================
-- MÉDICOS
-- =====================================================

INSERT INTO medicos (nome_medico,especialidade) VALUES

('Dr. Gregory House','Diagnóstico Médico'),
('Dr. Paulo Muzy','Clínico Geral'),
('Dr. Rey','Cirurgia Plástica'),
('Dr. Drauzio Varella','Oncologia'),
('Dr. Younan Nowzaradan','Cirurgia Bariátrica'),
('Dr. Shaun Murphy','Clínico Geral');

-- =====================================================
-- HORÁRIOS DOS MÉDICOS
-- =====================================================

-- =====================================================
-- HORÁRIOS DOS MÉDICOS
-- =====================================================

-- Gregory House
INSERT INTO horarios_medicos (medicos_idmedicos,dia,hora,status) VALUES
(1,'2026-07-10','08:00:00','Disponivel'),
(1,'2026-07-10','10:00:00','Disponivel'),
(1,'2026-07-10','14:00:00','Disponivel'),
(1,'2026-07-11','16:00:00','Disponivel');

-- Paulo Muzy
INSERT INTO horarios_medicos (medicos_idmedicos,dia,hora,status) VALUES
(2,'2026-07-10','08:00:00','Disponivel'),
(2,'2026-07-10','10:00:00','Disponivel'),
(2,'2026-07-10','14:00:00','Disponivel'),
(2,'2026-07-11','16:00:00','Disponivel');

-- Rey
INSERT INTO horarios_medicos (medicos_idmedicos,dia,hora,status) VALUES
(3,'2026-07-10','08:00:00','Disponivel'),
(3,'2026-07-10','10:00:00','Disponivel'),
(3,'2026-07-10','14:00:00','Disponivel'),
(3,'2026-07-11','16:00:00','Disponivel');

-- Drauzio
INSERT INTO horarios_medicos (medicos_idmedicos,dia,hora,status) VALUES
(4,'2026-07-10','08:00:00','Disponivel'),
(4,'2026-07-10','10:00:00','Disponivel'),
(4,'2026-07-10','14:00:00','Disponivel'),
(4,'2026-07-11','16:00:00','Disponivel');

-- Nowzaradan
INSERT INTO horarios_medicos (medicos_idmedicos,dia,hora,status) VALUES
(5,'2026-07-10','10:00:00','Disponivel'),
(5,'2026-07-10','14:00:00','Disponivel'),
(5,'2026-07-10','08:00:00','Disponivel'),
(5,'2026-07-11','16:00:00','Disponivel');

-- Shaun Murphy
INSERT INTO horarios_medicos (medicos_idmedicos,dia,hora,status) VALUES
(6,'2026-07-10','08:00:00','Disponivel'),
(6,'2026-07-10','10:00:00','Disponivel'),
(6,'2026-07-10','14:00:00','Disponivel'),
(6,'2026-07-11','16:00:00','Disponivel');
-- =====================================================
-- AGENDAMENTOS DE EXEMPLO
-- =====================================================

INSERT INTO agendamentos (status_consulta,pacientes_idpacientes,horarios_idhorario) VALUES

('Confirmado',1,1),
('Confirmado',2,5),
('Confirmado',3,10);

-- =====================================================
-- MARCA OS HORÁRIOS COMO OCUPADOS
-- =====================================================

UPDATE horarios_medicos
SET status='Ocupado'
WHERE idhorario IN (1,5,10);

-- drop database praVoce_db;