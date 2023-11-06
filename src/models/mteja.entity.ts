import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductCategory } from "./product-category.entity";
import { Mzigo } from "./mzigo.entity";

@Entity({ name: "mteja" })
export class Mteja {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  jina_la_mteja: string;
  @Column()
  location_ya_mteja: string;
  @Column()
  namba_ya_simu: string;
  @ManyToOne(() => ProductCategory, (category) => category.wateja)
  category: ProductCategory;
  @OneToMany(() => Mzigo, (mzigo) => mzigo.mteja)
  mizigo: Mzigo[];
}
