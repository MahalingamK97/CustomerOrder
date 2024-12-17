import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { UploadHistory } from '../upload-history/entity/upload-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, UploadHistory])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
