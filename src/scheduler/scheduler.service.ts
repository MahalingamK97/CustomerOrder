import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OrderService } from '../order/order.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadHistory, UploadStatus } from '../upload-history/entity/upload-history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SchedulerService {
    constructor(
        private readonly orderService: OrderService,
        @InjectRepository(UploadHistory) 
        private readonly uploadHistory: Repository<UploadHistory>
    ) { }

    @Cron('0 0 * * *')
    async refreshOrders() {
        const history = await this.uploadHistory.save({
            filePath: 'public/lumel-csv.csv',
            status: UploadStatus.PENDING,
            uploadedDate: new Date(),
            comment: ''
        });
        await this.orderService.processFile('public/lumel-csv.csv', history.id);
    }
}
