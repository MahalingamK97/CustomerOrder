import { Controller, Post, Req, Res } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';

@Controller('scheduler')
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {  
  }

  @Post('/refresh-orders')
  async refreshOrders() {
   this.schedulerService.refreshOrders();
   return 'Success'
  }
}
