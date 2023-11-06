import { Module } from "@nestjs/common";
import { MtejaService } from "./mteja.service";
import { MtejaController } from "./mteja.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Mteja } from "src/models/mteja.entity";
import { ProductCategory } from "src/models/product-category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Mteja, ProductCategory])],
  controllers: [MtejaController],
  providers: [MtejaService],
})
export class MtejaModule {}
