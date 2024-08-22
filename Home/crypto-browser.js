const crypto = require('crypto');

const CryptoEncrypt = ({ message, key }) => {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let encryptedMessage = cipher.update(message, 'utf8', 'hex');
  encryptedMessage += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return { encryptedMessage, authTag, iv };
};

const CryptoDecrypt = ({ message, key, authTag, iv }) => {
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  let decryptedMessage = decipher.update(message, 'hex', 'utf8');
  decryptedMessage += decipher.final('utf8');
  return decryptedMessage;
};

window.CryptoEncrypt = CryptoEncrypt;
window.CryptoDecrypt = CryptoDecrypt;
