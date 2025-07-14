import { Test, TestingModule } from '@nestjs/testing';
import { EncryptService } from './encrypt.service';

describe('EncryptService', () => {
  let service: EncryptService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncryptService],
    }).compile();

    service = module.get<EncryptService>(EncryptService);
  });

  it('should encrypt and decrypt the same payload', () => {
    const payload = 'test secret message';
    const { data } = service.getEncryptData(payload);
    const result = service.getDecryptData(data.data1, data.data2);
    expect(result.data.payload).toBe(payload);
  });
});
