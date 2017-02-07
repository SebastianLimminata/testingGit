'use strict';

let request = require('request');
let nconf = require('nconf');
let sql = require('mssql');
let ProductSKU = require('../domains/product_sku');

var config = {
    server: '10.0.0.77',
    database: 'DOS2_HO',
    user: 'swdteam',
    password: 'dos2',
    port: 1433,
    options: {
        encrypt: false // Use this if you're on Windows Azure 
    }
};

function findOneSKU(partId){
    return new Promise((resolve, reject) => {
      request.get(`${nconf.get('DENODO_BASE_URL')}/trx_invecomputer_buffer?$format=json&$count=1&vpartid=${partId}`,
      {'auth':{'user':nconf.get('DENODO_ADMIN'), 'pass':nconf.get('DENODO_PASSWORD'), 'sendImmediately': false}},(error, response, body) => {
        if (error) {
          console.log('Product SKU at, error at: %s', error);
          return reject(error);
        }else{
          let skul = [];
          try{
            let result = JSON.parse(body);
            let lsku = result.elements;
            let jsku = new ProductSKU(lsku);
            skul.push(jsku);
            //console.log(JSON.stringify(skul));
            //let dbConn = new sql.Connection(config);
            //dbConn.connect().then(function () {
              //let request = new sql.Request(dbConn);
              //request.query("select top 1 vpartid from trx_invecomputer;").then(function (recordSet) {
              //    console.log(recordSet);
              //    dbConn.close();
              //}).catch(function (err) {
              //    console.log(err);
              //    dbConn.close();
              //});
            //}).catch(function (err) {
            //   console.log(err);
            //});
            //console.log(JSON.stringify(skul));
            //console.log(`TESTING`);
            //cb(skul);
            let data = skul;
            return resolve(data);
            //console.log('Product SKU :, data: %s', JSON.stringify(skul));
          }catch(e){
            //console.log('Product SKU :, error at: %s', e);
            return reject(`error, ${e}`);
          }
        }
      });
    });
  }

class ProductSKURepository{

  constructor(config){
    this.config = config;
  }

  processOneSKU(partId, cb, errCb){
    Promise.all([  
      findOneSKU(partId)
    ])
    .then((data) => {
      console.log(JSON.stringify(data))
      cb(data); 
    })
    .catch((err) => {
      console.log(err);
      cb(err);
    }) 
  }
}

module.exports = ProductSKURepository;