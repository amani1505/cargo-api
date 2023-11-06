import { Module } from "@nestjs/common";
import { ProductCategoryService } from "./product-category.service";
import { ProductCategoryController } from "./product-category.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductCategory } from "src/models/product-category.entity";
import { Mteja } from "src/models/mteja.entity";
import { Mzigo } from "src/models/mzigo.entity";
import { Product } from "src/models/product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory, Mteja, Mzigo, Product])],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
})
export class ProductCategoryModule {}
