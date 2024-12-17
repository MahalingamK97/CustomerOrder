import { Module } from '@nestjs/common';
import { UploadHistoryService } from './upload-history.service';
import { UploadHistoryController } from './upload-history.controller';

@Module({
  controllers: [UploadHistoryController],
  providers: [UploadHistoryService],
})
export class UploadHistoryModule {}
