import CryptoJS from 'react-native-crypto-js';

const ENC_MESSAGE_KEY = 'DEMO_TEST'

export const encryptData = (data: object) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), ENC_MESSAGE_KEY).toString();
  };

  export const decryptData = (encryptedData: any) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENC_MESSAGE_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  };