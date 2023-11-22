import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/models/product.entity';
import { ProductCategory } from 'src/models/product-category.entity';
import { Institute } from 'src/models/institution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductCategory, Institute])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
