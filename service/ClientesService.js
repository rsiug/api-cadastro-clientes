"use strict";
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("tools/db.json");
const db = low(adapter);

async function getLastId() {
  const id = db
    .get("clientes")
    .orderBy("id", "desc")
    .value()[0].id;
  return (await (id || 0)) + 1;
}
/**
 * Insere um novo cliente
 *
 * cliente NewCliente Objeto cliente para inserção
 * no response value expected for this operation
 **/
exports.addCliente = function(cliente) {
  return new Promise(async function(resolve, reject) {
    cliente.id = await getLastId();
    console.log("id", cliente.id);

    db.get("clientes")
      .push({
        id: cliente.id,
        nome: cliente.nome,
        dataNascimento: cliente.dataNascimento,
        filhos: cliente.filhos,
        endereco: cliente.endereco
      })
      .write();
    resolve(cliente);
  });
};

/**
 * Exclui um cliente a partir do ID
 * Remove um cliente
 *
 * id Long ID do cliente que será excluído
 * no response value expected for this operation
 **/
exports.deleteCliente = function(id) {
  return new Promise(function(resolve, reject) {
    const exists = db
      .get("clientes")
      .find({ id: id })
      .value();
    if (exists) {
      db.get("clientes")
        .remove({ id: id })
        .value();
      resolve();
    } else {
      reject({
        code: 404,
        message: "Cliente não encontrado"
      });
    }
  });
};

/**
 * Busca um cliente pelo ID
 * Retorna um único cliente
 *
 * id Long ID do cliente a ser retornado
 * returns cliente
 **/
exports.getCliente = function(id) {
  return new Promise(function(resolve, reject) {
    var cliente = db
      .get("clientes")
      .find({ id: id })
      .value();
    if (cliente) resolve(cliente);
    else {
      reject({
        code: 404,
        message: "Cliente não encontrado"
      });
    }
  });
};

/**
 * Retorna todos os clientes cadastrados
 *
 * returns List
 **/
exports.getClientes = quantidade => {
  return new Promise((res, rej) => {
    if (!quantidade) {
      const clientes = db.get("clientes").write();
      res(clientes);
    } else {
      const clientes = db
        .get("clientes")
        .take(quantidade)
        .write();
      res(clientes);
    }
  }).catch(err => {
    reject({
      code: 404,
      message: "Não foi possivel realizar a consulta:" + err.message
    });
  });
};

/**
 * Atualiza um cliente a partir dos dados do formulário
 * Altera um cliente
 *
 * id Long ID do cliente a ser atualizado
 * cliente NewCliente Objeto cliente para atualização
 * no response value expected for this operation
 **/
exports.updateCliente = function(id, cliente) {
  return new Promise(function(resolve, reject) {
    const exists = db
      .get("clientes")
      .filter({ id: id })
      .value();
    if (exists) {
      db.get("clientes")
        .find({ id: id })
        .assign({ ...cliente })
        .value();
      resolve(cliente);
    } else {
      reject({
        code: 404,
        message: "Cliente não encontrado"
      });
    }
  });
};
