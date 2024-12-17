import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Customer } from '../../customer/entity/customer.entity';
import { Product } from '../../product/entity/product.entity';

@Entity()
export class Order {
  @PrimaryColumn({ type: 'text' })
  orderId: string;

  @Column()
  region: string;

  @Column({ type: 'date' })
  dateOfSale: string;

  @Column({ type: 'numeric' })
  quantitySold: number;

  @Column({ type: 'numeric' })
  discount: number;

  @Column({ type: 'numeric' })
  shippingCost: number;

  @Column()
  paymentMethod: string;

  @Column()
  customerId: string

  @Column()
  productId: string;

  @ManyToOne(() => Customer, (c) => c.orders, { cascade: true })
  @JoinColumn()
  customer: Customer

  @ManyToOne(() => Product, (p) => p.orders, { cascade: true })
  @JoinColumn()
  product: Product;
}
