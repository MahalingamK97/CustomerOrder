import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { readFile, utils } from 'xlsx';
import { UploadHistory, UploadStatus } from '../upload-history/entity/upload-history.entity';
import { readdirSync, rmSync } from 'fs';
import { reverse } from 'dns';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepo: Repository<Order>,
        @InjectRepository(UploadHistory)
        private readonly uploadHistoryRepo: Repository<UploadHistory>) { }

    async uploadOrders(file: Express.Multer.File) {
        console.log(file)
        const workbookHeaders = readFile(file.path, {
            sheetRows: 1,
            type: 'buffer',
        });
        const columnsArray = utils.sheet_to_json(
            workbookHeaders.Sheets[workbookHeaders.SheetNames[0]],
            { header: 1 },
        )[0] as string[];

        const headers = ["Order ID", "Product ID", "Customer ID", "Product Name", "Category", "Region", "Date of Sale", "Quantity Sold", "Unit Price", "Discount", "Shipping Cost", "Payment Method", "Customer Name", "Customer Email", "Customer Address"];
        const invalidHeaders = [];
        columnsArray.forEach((header) => {
            if (!headers.includes(header)) {
                invalidHeaders.push(header);
            }
        });
        if (invalidHeaders.length > 0) {
            throw new Error(
                `Invalid headers, ${invalidHeaders.join(
                    ', ',
                )}. The headers must include only valid values ${headers.join(', ')}`,
            );
        }

        const history = await this.uploadHistoryRepo.save({
            filePath: file.originalname,
            status: UploadStatus.PENDING,
            uploadedDate: new Date(),
            comment: ''
        });

        this.processFile(file.path, history.id);

        return 'Success';
    }

    public async processFile(filepath, historyId) {
        const workbook = readFile(filepath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const pendingOrders = utils.sheet_to_json(sheet, { raw: false });

        readdirSync('file').forEach(f => rmSync(`file/${f}`));

        let startingIndex = 0;
        const batch = 100;
        try {
            for (let i = 0; i < Math.ceil(pendingOrders.length / batch); i++) {
                const batchOrders = pendingOrders.slice(
                    startingIndex,
                    startingIndex + batch,
                );
                const orders = []
                for (const order of batchOrders) {
                    console.log(order)
                    let format = {
                        orderId: order['Order ID'],
                        region: order['Region'],
                        dateOfSale: order['Date of Sale'],
                        quantitySold: order['Quantity Sold'],
                        discount: order['Discount'],
                        shippingCost: order['Shipping Cost'],
                        paymentMethod: order['Payment Method'],
                        customerId: order['Customer ID'],
                        productId: order['Product ID'],
                        product: {
                            productId: order['Product ID'],
                            productName: order['Product Name'],
                            category: order['Category'],
                            unitPrice: order['Unit Price'],
                        },
                        customer: {
                            customerId: order['Customer ID'],
                            customerName: order['Customer Name'],
                            customerEmail: order['Customer Email'],
                            customerAddress: order['Customer Address']
                        }
                    }
                    console.log(format)
                    orders.push(format)
                }
                await this.orderRepo.save(orders)
            }

            await this.uploadHistoryRepo.update(historyId, { status: UploadStatus.SUCCESS })
        } catch (e) {
            await this.uploadHistoryRepo.update(historyId, { status: UploadStatus.FAILED, comment: e.message })
        }
    }

    public async getRevenueByDate(body) {
        let productQuery = '', regionQuery='', categoryQuery = '';

        if(body.product) {
            productQuery = `and p."productName" ilike '%${body.product}%'`
        }
        if(body.region) {
            regionQuery = `and o."region" ilike '%${body.region}%'`
        }
        if(body.category) {
            categoryQuery = `and p."category" ilike '%${body.category}%'`
        }
        const [ result ]= await this.orderRepo.query(`
        select 
          sum(round((("quantitySold" * p."unitPrice" ) - (("quantitySold" * p."unitPrice" )* o.discount))+ "shippingCost", 2)) as revenue
        from "order" o left join product p on p."productId" = o."productId" 
        where "dateOfSale" between '${body.startDate}' and '${body.endDate}' ${productQuery} ${regionQuery} ${categoryQuery}`);
            console.log(result)
        return { revenue: result.revenue } 
    }
}