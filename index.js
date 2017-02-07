'use strict';

const AppServer = require('./lib/app/server');
const nconf   = require('nconf');

const configs = require('./lib/config.js');
configs.initEnvironments(nconf);

const appServer = new AppServer();
const port = process.env.port || nconf.get('PORT') || 1337;

appServer.server.listen(port, () => {
  console.log('%s started, listening at %s', appServer.server.name, appServer.server.url);
});
