// src/common/crypto-helper.ts
const crypto = require('crypto');
const NodeRSA = require('node-rsa');

export class CryptoHelper {
  // Generate 256-bit AES key
  static generateAesKey(): Buffer {
    return crypto.randomBytes(32);
  }

  // AES-256-GCM encrypt
  static aesEncrypt(plainText: string, key: Buffer) {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    const encrypted = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return { iv, encrypted, tag };
  }

  // AES-256-GCM decrypt
  static aesDecrypt(encrypted: Buffer, key: Buffer, iv: Buffer, tag: Buffer): string {
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString();
  }

  // RSA encrypt AES key with private key (per your spec)
  static rsaEncryptWithPrivateKey(data: Buffer, privateKeyPem: string): Buffer {
    const key = new NodeRSA(privateKeyPem);
    return key.encryptPrivate(data);
  }

  // RSA decrypt AES key with public key (per your spec)
  static rsaDecryptWithPublicKey(data: Buffer, publicKeyPem: string): Buffer {
    const key = new NodeRSA(publicKeyPem);
    return key.decryptPublic(data);
  }
}
