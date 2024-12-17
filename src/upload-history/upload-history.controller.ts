import { Controller } from '@nestjs/common';
import { UploadHistoryService } from './upload-history.service';

@Controller('upload-history')
export class UploadHistoryController {
  constructor(private readonly uploadHistoryService: UploadHistoryService) {}
}
