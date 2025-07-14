import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { CryptoHelper } from '../common/crypto-helper';

@Injectable()
export class EncryptService {
  private privateKey = fs.readFileSync('private_key.pem', 'utf8');
  private publicKey = fs.readFileSync('public_key.pem', 'utf8');

  getEncryptData(payload: string) {
    const aesKey = CryptoHelper.generateAesKey();
    const { iv, encrypted, tag } = CryptoHelper.aesEncrypt(payload, aesKey);

    const data2 = Buffer.concat([iv, tag, encrypted]).toString('base64');
    const data1 = CryptoHelper.rsaEncryptWithPrivateKey(aesKey, this.privateKey).toString('base64');

    return { successful: true, error_code: null, data: { data1, data2 } };
  }

  getDecryptData(data1: string, data2: string) {
    const aesKey = CryptoHelper.rsaDecryptWithPublicKey(Buffer.from(data1, 'base64'), this.publicKey);
    const buff = Buffer.from(data2, 'base64');
    const iv = buff.subarray(0, 12);
    const tag = buff.subarray(12, 28);
    const encrypted = buff.subarray(28);

    const payload = CryptoHelper.aesDecrypt(encrypted, aesKey, iv, tag);
    return { successful: true, error_code: null, data: { payload } };
  }
}
