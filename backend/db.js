
const connect = async () => {

    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection
    }

    const mysql = require("mysql2/promise")
    const connection = await mysql.createConnection("mysql://root:root@localhost:3306/ecommerce")
    global.connection = connection
    return connection
}

const listarProduto = async () => {
    const conn = await connect();
    return await conn.query('select * from itens');
}

const listarDestaques = async () => {
    const conn = await connect();
    return await conn.query('select * from itens where destaques = 1');
}

const listarTipos = async () => {
    const conn = await connect();
    return await conn.query('select * from tipos');
}

const listarProdutoId = async (valor) => {
    const conn = await connect();
    return await conn.query(`select i.nome, i.preco, i.imagem, i.descricao from itens as i inner join tipos as t on t.id = i.tipo where i.tipo = ${valor};`);
}



connect();

module.exports = { listarProduto, listarTipos, listarProdutoId, listarDestaques }