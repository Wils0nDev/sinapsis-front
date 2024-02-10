import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConstantValue } from '../constants/general/general';
import * as CryptoJS from 'crypto-js';
const  SecureStorage = require('secure-web-storage');

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public secureStorage = new SecureStorage(localStorage, {    
    hash: function hash(key: any) {
      return key.toString();
    },
    encrypt: function encrypt(data: any) {
      
      const passKey = environment.lastKeyEncrypt
      let iv = CryptoJS.enc.Hex.parse(passKey);
      const pass = CryptoJS.enc.Utf8.parse(passKey);
      const salt = CryptoJS.enc.Utf8.parse(passKey);
      const key = CryptoJS.PBKDF2(pass.toString(CryptoJS.enc.Utf8), salt, {
        keySize: 128 / 32,
        iterations: 1000,
      });
      data = CryptoJS.AES.encrypt(data, key, {
        mode: CryptoJS.mode.CBC,
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
      });
      return data.toString();
    },
    decrypt: function decrypt(
      data:any,
      ivEncrypt = null,
      passEncrypt = null,
      keyEncrypt = null
    ) {
      
      const cleanKey = environment.lastKeyEncrypt
      let iv = CryptoJS.enc.Hex.parse(ivEncrypt || cleanKey);
      let pass = CryptoJS.enc.Utf8.parse(cleanKey );
      let salt = CryptoJS.enc.Utf8.parse(cleanKey);
      let key = CryptoJS.PBKDF2(pass.toString(CryptoJS.enc.Utf8), salt, {
        keySize: 128 / 32,
        iterations: 1000,
      });

      let cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(data),
      });
      let decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
        mode: CryptoJS.mode.CBC,
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
      });
      return decrypted.toString(CryptoJS.enc.Utf8);
    },
  });
}
