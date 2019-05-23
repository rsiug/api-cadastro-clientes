'use strict';

var utils = require('../utils/writer.js');
var Clientes = require('../service/ClientesService');

module.exports.addCliente = function addCliente (req, res, next) {
  var cliente = req.swagger.params['cliente'].value;
  Clientes.addCliente(cliente)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteCliente = function deleteCliente (req, res, next) {
  var id = req.swagger.params['id'].value;
  Clientes.deleteCliente(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
      .catch(function (response) {
          utils.writeJson(res, response);
    });
};

module.exports.getCliente = function getCliente (req, res, next) {
  var id = req.swagger.params['id'].value;
  Clientes.getCliente(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getClientes = function getClientes (req, res, next) {
  Clientes.getClientes()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateCliente = function updateCliente (req, res, next) {
  var id = req.swagger.params['id'].value;
  var cliente = req.swagger.params['cliente'].value;
  Clientes.updateCliente(id,cliente)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
