import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductCategory } from "./product-category.entity";

@Entity({ name: "product" })
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  name: string;
  @ManyToOne(() => ProductCategory, (category) => category.products)
  category: ProductCategory;
}
