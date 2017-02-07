'use strict';

let re = require('restify-errors');

let ProductSKURepository = require('../repositories/product_sku_repository');

let getOneSKU = (req, res, next) => {
  let productSKURepo = new ProductSKURepository();
  let partId = req.params.partId;
  productSKURepo.processOneSKU(partId, data => {
    res.send({
      status: 'success',
      data: data,
      message: 'SKU was Existed'
    });
  }, err => {
    next(new re.InvalidArgumentError({
      statusCode: 409,
      message: err
    }));
  })
};

let getSKU = (req, res, next) => {
    console.log('got sku');
    res.send({
        status: 'success',
        data: 'data',
        message: 'get data sku'
    });
  //let productCategoryRepo = new ProductCategoryRepository();
  /*productCategoryRepo.findTopLevel(data => {
    res.send({
      status: 'success',
      data: data,
      message: 'get categories top level'
    });
  }, err => {
    next(new re.InvalidArgumentError({
      statusCode: 409,
      message: err
    }));
  });*/
};

module.exports = {
  getSKU: getSKU,
  getOneSKU: getOneSKU
};