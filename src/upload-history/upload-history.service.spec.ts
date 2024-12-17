import { Test, TestingModule } from '@nestjs/testing';
import { UploadHistoryService } from './upload-history.service';

describe('UploadHistoryService', () => {
  let service: UploadHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadHistoryService],
    }).compile();

    service = module.get<UploadHistoryService>(UploadHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
