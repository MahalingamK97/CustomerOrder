import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Order } from '../../order/entity/order.entity';

@Entity()
export class Customer {
  @PrimaryColumn('text')
  customerId: string;

  @Column()
  customerName: string;

  @Column()
  customerEmail: string;

  @Column()
  customerAddress: string;

  @OneToMany(() => Order, (o) => o.customer)
  orders: Order[]
}
