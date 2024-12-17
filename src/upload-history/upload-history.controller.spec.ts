import { Test, TestingModule } from '@nestjs/testing';
import { UploadHistoryController } from './upload-history.controller';
import { UploadHistoryService } from './upload-history.service';

describe('UploadHistoryController', () => {
  let controller: UploadHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadHistoryController],
      providers: [UploadHistoryService],
    }).compile();

    controller = module.get<UploadHistoryController>(UploadHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
