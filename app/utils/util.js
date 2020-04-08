'use strict';
const crypto = require('crypto');
const hash = crypto.createHash('sha1');
function getSha1HashString(s) {
  hash.update(s);
  return hash.digest('hex');
}
module.exports = {
  getSha1HashString,
};

