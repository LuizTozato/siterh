PRAGMA foreign_keys = ON;

INSERT INTO tb_servidor(id_servidor, nome)
VALUES (12345, 'Luiz Felipe Neves Tozato'),
       (23456, 'Samanta Cássia Vertuan'),
       (34567, 'Franciele Baptista');

INSERT INTO tb_pedido(id_servidor, email_solicitante, tipo, data_inicial, data_final, decimo_terceiro, abono)
VALUES (12345, 'teste@teste.com', 'fp', '2022-03-01', '2022-03-10', false, false),
       (23456, 'teste@teste.com', 'fc', '2022-03-05', '2022-03-15', false, false),
       (34567, 'teste@teste.com', 'bh', '2022-03-10', '2022-03-20', false, false)
