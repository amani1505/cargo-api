import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCategory } from './product-category.entity';
import { Institute } from './institution.entity';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @ManyToOne(() => ProductCategory, (category) => category.products)
  category: ProductCategory;
  @ManyToOne(() => Institute, (institute) => institute.products)
  institute: Institute;
}
