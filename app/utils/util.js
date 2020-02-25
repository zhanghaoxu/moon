'use strict';
const crypto = require('crypto');
const hash = crypto.createHash('sha1');
module.exports = function getSha1HashString(s) {
  hash.update(s);
  return hash.digest('hex');
};

