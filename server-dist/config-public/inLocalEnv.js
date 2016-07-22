'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return fs.readdirSync(path.join(__dirname)).indexOf('config') >= 0;
};