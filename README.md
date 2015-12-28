# mqttr [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> A routable mqtt library based on mqtt.js

## Installation

```sh
$ npm install --save mqttr
```

## Usage

```js
var mqttr = require('mqttr');

// You should start a mqtt server at 1883 before or after run this script
var client = mqttr.connect('mqtt://localhost');

client.on('connect', function () {
  console.log('connect');
});

client.on('reconnect', function () {
  console.log('reconnect');
});

client.on('close', function () {
  console.log('close');
});

client.on('offline', function () {
  console.log('offline');
});

client.on('error', function (err) {
  throw err;
});

client.subscribe('/users/:userid/message/:messageid/*', function (topic, message, route) {
  console.log('-------------------------------------------------');
  console.log('topic  :', topic);           // '/users/ty/message/4321/ping'
  console.log('message:', message);         // { hello: 'world' }
  console.log('params :', route.params);    // { userid: 'taoyuan', messageid: 4321 }
  console.log('slats  :', route.splats);    // [ 'ping' ]
  console.log('path   :', route.path);      // '/users/:userid/message/:messageid/:method'
  console.log('-------------------------------------------------');
  client.end();
});

client.ready(function () {
  client.publish('/users/taoyuan/message/4321/ping', {hello: 'world'});
});

```
## License

MIT © [taoyuan]()


[npm-image]: https://badge.fury.io/js/mqttr.svg
[npm-url]: https://npmjs.org/package/mqttr
[travis-image]: https://travis-ci.org/taoyuan/mqttr.svg?branch=master
[travis-url]: https://travis-ci.org/taoyuan/mqttr
[daviddm-image]: https://david-dm.org/taoyuan/mqttr.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/taoyuan/mqttr
[coveralls-image]: https://coveralls.io/repos/taoyuan/mqttr/badge.svg
[coveralls-url]: https://coveralls.io/r/taoyuan/mqttr