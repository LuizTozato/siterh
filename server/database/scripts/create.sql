DROP TABLE IF EXISTS tb_servidor;
DROP TABLE IF EXISTS tb_pedido;

CREATE TABLE tb_servidor
(
    id_servidor INTEGER PRIMARY KEY,
    nome        TEXT NOT NULL
);

CREATE TABLE tb_pedido
(
    id_pedido         INTEGER PRIMARY KEY AUTOINCREMENT,
    id_servidor       INTEGER NOT NULL,
    email_solicitante TEXT    NOT NULL,
    tipo              TEXT    NOT NULL,
    data_inicial      TEXT    NOT NULL,
    data_final        TEXT    NOT NULL,
    abono             BOOLEAN NOT NULL,
    decimo_terceiro   BOOLEAN NOT NULL,
    FOREIGN KEY (id_servidor) REFERENCES tb_servidor (id_servidor)
);

CREATE TABLE tb_credenciais
(
    login             TEXT NOT NULL,
    senha             TEXT NOT NULL
);