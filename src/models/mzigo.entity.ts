import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./status.enum";
import { Mteja } from "./mteja.entity";
import { ProductCategory } from "./product-category.entity";

@Entity({ name: "mzigo" })
export class Mzigo {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  uzito: number;
  @Column()
  image: string;
  @Column()
  tarehe_kuingia: string;
  @Column()
  tarehe_ya_kutoka: string;
  @Column({
    default: "remain",
  })
  status: string;
  @ManyToOne(() => Mteja, (mteja) => mteja.mizigo)
  mteja: Mteja;
  @ManyToOne(() => ProductCategory, (category) => category.mizigo)
  category: ProductCategory;
}
