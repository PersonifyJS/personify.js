
var Promise = require('native-or-bluebird')
var assert = require('assert')

module.exports = thenify

function thenify($$__fn__$$) {
  assert(typeof $$__fn__$$ === 'function')
  var name = $$__fn__$$.name || ''
  return eval('(function ' + name + '() {\n'
    + 'var self = this\n'
    + 'var len = arguments.length\n'
    + 'var args = new Array(len + 1)\n'
    + 'for (var i = 0; i < len; ++i) args[i] = arguments[i]\n'
    + 'var lastIndex = i\n'
    + 'return new Promise(function (resolve, reject) {\n'
      + 'args[lastIndex] = createCallback(resolve, reject)\n'
      + '$$__fn__$$.apply(self, args)\n'
    + '})\n'
  + '})')
}

function createCallback(resolve, reject) {
  return function(err, value) {
    if (err) return reject(err)
    var length = arguments.length
    if (length <= 2) return resolve(value)
    var values = new Array(length - 1)
    for (var i = 1; i < length; ++i) values[i - 1] = arguments[i]
    resolve(values)
  }
}
