const crypto = require('crypto');

const CryptoEncrypt = ({ message, key }) => {
  try {
    const iv = crypto.randomBytes(12);
    const convertedKey = Buffer.from(key, 'hex');
    const cipher = crypto.createCipheriv('aes-256-gcm', convertedKey, iv);
    let encryptedMessage = cipher.update(message, 'utf8', 'hex');
    encryptedMessage += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    return { encryptedMessage, authTag, iv: iv.toString('hex') };
  } catch (error) {
    throw new Error(error);
  }
};

const CryptoDecrypt = ({ message, key, authTag, iv }) => {
  try {
    const convertedIV = Buffer.from(iv, 'hex');
    const convertedKey = Buffer.from(key, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-gcm', convertedKey, convertedIV);
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    let decryptedMessage = decipher.update(message, 'hex', 'utf8');
    decryptedMessage += decipher.final('utf8');
    return decryptedMessage;
  } catch (error) {
    throw new Error(error);
  }
};

window.CryptoEncrypt = CryptoEncrypt;
window.CryptoDecrypt = CryptoDecrypt;
