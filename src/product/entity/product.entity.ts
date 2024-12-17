import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Order } from '../../order/entity/order.entity';

@Entity()
export class Product {
  @PrimaryColumn({ type: 'text' })
  productId: string;

  @Column()
  productName: string;

  @Column()
  category: string;

  @Column({ type: 'numeric' })
  unitPrice: number;

@OneToMany(() => Order, (o) => o.product)
  orders: Order[];
}
