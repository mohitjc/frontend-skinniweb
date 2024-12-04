import CryptoJS from 'crypto-js';

const secretKey = process.env.REACT_APP_CRYPTO_SECRET_KEY || 'defaultSecretKey';

export const encryptData = (data) => {
  let stringifiedData;

  if (typeof data === 'object') {
    stringifiedData = JSON.stringify(data);
  } else {
    stringifiedData = data.toString();

  return CryptoJS.AES.encrypt(stringifiedData, secretKey).toString();
};

}

export const encryptUrlData2 = (data) => {
  let value=data
  if(value) value=value.replaceAll('slAshD','/')
    if(value) value=value.replaceAll(' ','+')
  return value
}

export const decryptData = (p) => {
  let encryptedData=p
  if(p) encryptedData=p.replaceAll(' ','+')
  try {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedString) {
      console.error("Decryption failed. The data may be invalid.");
      return null;
    }
    try {
      const parsedData = JSON.parse(decryptedString);
      return parsedData;
    } catch (error) {
      if (!isNaN(Number(decryptedString))) {
        return Number(decryptedString);
      }
      return decryptedString;
    }
  } catch (error) {
    console.error("Error during decryption:", error);
    return null;
  }
};

export const getEncryptedUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const encryptedUrlParam = urlParams.get('encryptedUrl');
  return encryptedUrlParam;
};

export const getEncryptedUrlAndDecrypt = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const encryptedUrlParam = urlParams.get('encryptedUrl');

  if (encryptedUrlParam) {
    const decryptedURL = decryptData(encryptedUrlParam);
    return decryptedURL;
  } else {
    return null;
  }
};

export const encryptUrlData = (data) => {
  let stringifiedData;

  if (typeof data === 'object') {
    stringifiedData = JSON.stringify(data);
  } else {
    stringifiedData = data.toString();

    let value=CryptoJS.AES.encrypt(stringifiedData, secretKey).toString();
    if(value) value=value.replaceAll('/','slAshD')
  return value
};
}