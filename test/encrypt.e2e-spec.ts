import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('EncryptController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // load full app
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/get-encrypt-data (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/get-encrypt-data')
      .send({ payload: 'hello world' })
      .expect(201);

    expect(res.body.successful).toBe(true);
    expect(res.body.data.data1).toBeDefined();
    expect(res.body.data.data2).toBeDefined();
  });

  it('/get-decrypt-data (POST)', async () => {
    // encrypt first
    const encryptRes = await request(app.getHttpServer())
      .post('/get-encrypt-data')
      .send({ payload: 'hello world' });

    const { data1, data2 } = encryptRes.body.data;

    // then decrypt
    const decryptRes = await request(app.getHttpServer())
      .post('/get-decrypt-data')
      .send({ data1, data2 });

    expect(decryptRes.body.successful).toBe(true);
    expect(decryptRes.body.data.payload).toBe('hello world');
  });

  afterAll(async () => {
    await app.close();
  });
});
