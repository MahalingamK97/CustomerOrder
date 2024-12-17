import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('upload-orders')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './file',
      fileFilter(req, file, callback) {
        console.log(file)
        const ext = extname(file.originalname);
        if (ext === '.csv') {
          callback(null, true);
        } else {
          callback(
            new HttpException(
              `Unsupported file type ${ext}`,
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
      },
    }),
  )
  async uploadOrders(@UploadedFile() file: Express.Multer.File) {
    return this.orderService.uploadOrders(file);
  }

  @Get('/get-revenue')
  async getRevenue(@Body() body) {
    return this.orderService.getRevenueByDate(body)
  }
}
