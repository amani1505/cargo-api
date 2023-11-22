import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { ProductCategory } from './product-category.entity';
import { Product } from './product.entity';
import { Mzigo } from './mzigo.entity';
import { Mteja } from './mteja.entity';

@Entity({ name: 'institute' })
export class Institute {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  location: string;
  @Column()
  logo: string;
  @OneToMany(() => User, (user) => user.institute)
  users: User[];
  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.institute,
  )
  productCategories: ProductCategory[];
  @OneToMany(() => Product, (product) => product.institute)
  products: Product[];
  @OneToMany(() => Mzigo, (mzigo) => mzigo.institute)
  mizigo: Mzigo[];
  @OneToMany(() => Mteja, (mteja) => mteja.institute)
  wateja: Mteja[];
}
