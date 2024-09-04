const crypto = require("crypto");
const EC = require("elliptic").ec;
const ec = new EC("p521");

const CryptoVerifySignature = ({
  encryptedMessage,
  derSignature,
  publicKey,
}) => {
  try {
    const publicKeyObj = ec.keyFromPublic(publicKey, "hex");
    const encryptedMessageHash = crypto
      .createHash("sha256")
      .update(encryptedMessage)
      .digest();
    const isValidSignature = publicKeyObj.verify(
      encryptedMessageHash,
      derSignature
    );
    return isValidSignature;
  } catch (error) {
    throw new Error(error);
  }
};

window.CryptoVerifySignature = CryptoVerifySignature;
