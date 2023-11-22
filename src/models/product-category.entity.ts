import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Mteja } from './mteja.entity';
import { Mzigo } from './mzigo.entity';
import { Product } from './product.entity';
import { Institute } from './institution.entity';

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
  @ManyToOne(() => Institute, (institute) => institute.productCategories)
  institute: Institute;
}
