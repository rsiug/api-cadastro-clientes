'use strict';

var clientes = new Array();

/**
 * Insere um novo cliente
 *
 * cliente NewCliente Objeto cliente para inserção
 * no response value expected for this operation
 **/
exports.addCliente = function (cliente) {
    return new Promise(function (resolve, reject) {
        cliente.id = clientes.length + 1;
        clientes.push(cliente);
        resolve(cliente);
    });
}


/**
 * Exclui um cliente a partir do ID
 * Remove um cliente
 *
 * id Long ID do cliente que será excluído
 * no response value expected for this operation
 **/
exports.deleteCliente = function (id) {
    return new Promise(function (resolve, reject) {
        var findClient = clientes.find((c) => c.id == id);
        if (findClient) {
            for (var i = 0; i < clientes.length; i++) {
                if (clientes[i].id === findClient.id) {
                    clientes.splice(i, 1);
                }
            }
            resolve();
        }
        else {
            reject({
                code: 404,
                message: "Client not found"
            });
        }
    });
}


/**
 * Busca um cliente pelo ID
 * Retorna um único cliente
 *
 * id Long ID do cliente a ser retornado
 * returns cliente
 **/
exports.getCliente = function (id) {
    return new Promise(function (resolve, reject) {

        var findClient = clientes.find((c) => c.id == id);
        if (findClient)
            resolve(findClient); 
        else {
            reject({
                code: 404,
                message: "Client not found"
            });
        }
    });
}


/**
 * Retorna todos os clientes cadastrados
 *
 * returns List
 **/
exports.getClientes = function (quantidade) {
    return new Promise(function (resolve, reject) {
        if (quantidade) {
            if (quantidade > clientes.length)
                quantidade = clientes.length;
            resolve(clientes.slice(0, quantidade));
        }
        else
            resolve(clientes);
    });
}


/**
 * Atualiza um cliente a partir dos dados do formulário
 * Altera um cliente
 *
 * id Long ID do cliente a ser atualizado
 * cliente NewCliente Objeto cliente para atualização
 * no response value expected for this operation
 **/
exports.updateCliente = function (id, cliente) {
    return new Promise(function (resolve, reject) {
        var findClient = clientes.find((c) => c.id == id);
        if (findClient) {
            for (var i = 0; i < clientes.length; i++) {
                if (clientes[i].id === findClient.id) {
                    cliente.id = findClient.id;
                    clientes[i] = cliente;
                }
            }
            resolve(cliente);
        }
        else {
            reject({
                code: 404,
                message: "Client not found"
            });
        }
    });
}

