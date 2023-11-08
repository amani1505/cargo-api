import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Mteja } from './mteja.entity';
import { Mzigo } from './mzigo.entity';
import { Product } from './product.entity';

@Entity({ name: 'product-category' })
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @OneToMany(() => Mteja, (mteja) => mteja.category)
  wateja: Mteja[];
  @OneToMany(() => Mzigo, (mzigo) => mzigo.category)
  mizigo: Mzigo[];
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
