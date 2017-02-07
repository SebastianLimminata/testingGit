'use strict';

let restify = require('restify');
let serveStatic = require('serve-static-restify');
let project = require('../../package.json');

let productSKUHandler = require('../modules/product/handlers/product_sku_handler');

let AppServer = function(){
  this.server = restify.createServer({
    name: project.name + '-server',
    version: project.version
  });

  this.server.serverKey = '';
  this.server.use(restify.acceptParser(this.server.acceptable));
  this.server.use(restify.queryParser());
  this.server.use(restify.bodyParser());
  this.server.use(restify.authorizationParser());

  //anonymous can access the end point, place code bellow
  this.server.get('/api/sku', productSKUHandler.getSKU);
  this.server.get('/api/onesku/:partId', productSKUHandler.getOneSKU);
  
};

module.exports = AppServer;