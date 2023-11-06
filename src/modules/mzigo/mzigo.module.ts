import { Module } from "@nestjs/common";
import { MzigoService } from "./mzigo.service";
import { MzigoController } from "./mzigo.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Mzigo } from "src/models/mzigo.entity";
import { Mteja } from "src/models/mteja.entity";
import { ProductCategory } from "src/models/product-category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Mzigo, Mteja, ProductCategory])],
  controllers: [MzigoController],
  providers: [MzigoService],
})
export class MzigoModule {}
