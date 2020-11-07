const { createHash } = require('crypto');
const { getUserFromKey } = require('../mongo/functions.js');

module.exports.createKey = async () => {
  let string = this.generateRandomString(40);
  let urlTest = await getUserFromKey(string);
  if (urlTest !== null) return this.createKey();
  return string;
};

module.exports.generateRandomString = length => {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  let charsLength = chars.length;
  let result = '';
  for (let i = 0; i < length; i++) result += chars.charAt(Math.floor(Math.random() * charsLength));

  return result;
};

module.exports.sha256 = str => createHash('sha256').update(str).digest('hex');
