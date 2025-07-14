# 🔐 RSA-AES Encryption Service (NestJS)

This service provides two REST APIs to encrypt and decrypt data using a hybrid encryption scheme:

- AES-256-GCM is used to encrypt the payload.
- AES key is encrypted with **RSA private key** (per custom spec).

> Note: This encryption flow is non-standard. Normally, RSA public key is used to encrypt. This service follows a custom spec requiring RSA private key encryption and public key decryption.

---

## 📦 Requirements

- Node.js >= 18
- npm >= 9

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/jeanyjean/nest-rsa-aes-service
cd nest-rsa-aes-service
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Generate RSA Key Pair
Use https://cryptotools.net/rsagen and select 2048 key length

### 4. Place RSA Key Pair
Place the keys in the following files name: private_key.pem and public_key.pem in the directory

### 5. Run Unit Tests
```bash
npm run test
```

### 5. Run the Service
```bash
npm run start
```
The service runs by default at:
http://localhost:3000

### 6. Acess API Documentation (Swagger)
Once the service is running, open:

http://localhost:3000/api-docs

You can test both endpoints interactively here.

