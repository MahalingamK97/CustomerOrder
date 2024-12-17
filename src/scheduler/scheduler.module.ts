import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../order/entity/order.entity';
import { OrderService } from '../order/order.service';
import { UploadHistory } from '../upload-history/entity/upload-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UploadHistory, Order])],
  controllers: [SchedulerController],
  providers: [SchedulerService, OrderService],
})
export class SchedulerModule { }
