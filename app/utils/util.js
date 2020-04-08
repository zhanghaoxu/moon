'use strict';
const crypto = require('crypto');

function getSha1HashString(s) {
  const hash = crypto.createHash('sha1');
  hash.update(s);
  return hash.digest('hex');
}
module.exports = {
  getSha1HashString,
};

