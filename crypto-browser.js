const crypto = require('crypto');

const CryptoEncrypt = ({ message, key }) => {
  const iv = crypto.randomBytes(12);
  const convertedKey = Buffer.from(key);
  const cipher = crypto.createCipheriv('aes-256-gcm', convertedKey, iv);
  let encryptedMessage = cipher.update(message, 'utf8', 'hex');
  encryptedMessage += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return { encryptedMessage, authTag, iv };
};

const CryptoDecrypt = ({ message, key, authTag, iv }) => {
  const convertedIV = Buffer.from(iv);
  const convertedKey = Buffer.from(key);
  const decipher = crypto.createDecipheriv('aes-256-gcm', convertedKey, convertedIV);
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  let decryptedMessage = decipher.update(message, 'hex', 'utf8');
  decryptedMessage += decipher.final('utf8');
  return decryptedMessage;
};

window.CryptoEncrypt = CryptoEncrypt;
window.CryptoDecrypt = CryptoDecrypt;
