#!/usr/bin/env node

const _ = require('lodash');
const mqtt = require('mqtt');

exports.codec = require('./lib/codec');
exports.Client = require('./lib/client');
exports.Router = require('./lib/router');

exports.connect = function (url, options) {
  if (typeof url === 'object') {
    options = url;
    url = undefined;
  }
  options = _.assign({qos: 1}, options);
  options.codec = options.codec || 'json';

  if (typeof options.codec === 'string') {
    if (!exports.codec[options.codec]) throw new Error('Unknown codec: ' + options.codec);
    options.codec = exports.codec[options.codec](options);
  }
  return new exports.Client(mqtt.connect(url, options), options);
};

function cli() {
  const commist = require('commist')(),
    helpMe = require('help-me')();

  commist.register('publish', require('./bin/pub'));
  commist.register('subscribe', require('./bin/sub'));
  commist.register('version', function () {
    console.log('MQTT.js version:', require('./package.json').version);
  });
  commist.register('help', helpMe.toStdout);

  if (commist.parse(process.argv.slice(2)) !== null) {
    console.log('No such command:', process.argv[2], '\n');
    helpMe.toStdout();
  }
}

if (require.main === module) {
  cli();
}
