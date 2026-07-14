DROP DATABASE IF EXISTS api;

CREATE DATABASE api;

USE api;

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255),
    preco DECIMAL(10,2) NOT NULL CHECK(preco > 0),
    estoque INT NOT NULL DEFAULT 0 CHECK(estoque >= 0)
);

INSERT INTO produtos (nome, descricao, preco, estoque)
VALUES ('Notebook', 'Notebook Dell Inspiron', 4200.00, 5),
('Mouse', 'Mouse Gamer RGB', 150.00, 20),
('Teclado', 'Teclado Mecânico', 350.00, 12);
