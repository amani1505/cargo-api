import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from 'src/models/product-category.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/models/product.entity';
import { UpdateMessage } from 'src/messages/update.message';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private _productRepository: Repository<Product>,
    @InjectRepository(ProductCategory)
    private _productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const productCategoryId = createProductDto.categoryId;

      const category = await this._productCategoryRepository.findOne({
        where: { id: productCategoryId },
      });

      if (!category) {
        throw new NotFoundException(`category not found`);
      }
      const product = this._productRepository.create(createProductDto);
      product.category = category;
      return await this._productRepository.save(product);
    } catch (error) {
      throw new HttpException(
        `Failed to create!:${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this._productRepository.find({
        relations: ['category'],
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      const product = await this._productRepository.findOne({
        where: { id },
        relations: ['category'],
      });
      if (!product) {
        throw new NotFoundException(`product not found`);
      }

      return product;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
  async update(
    id: string,
    updateProductDto: CreateProductDto,
  ): Promise<UpdateMessage> {
    try {
      const product = await this._productRepository.findOne({
        where: { id },
      });
      if (!product) {
        throw new NotFoundException(`product not found`);
      }
      await this._productRepository.update(id, updateProductDto);
      return new UpdateMessage(true, 'successfull update the product');
    } catch (error) {
      return new UpdateMessage(
        false,
        `Failed to update product: ${error.message}`,
      );
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const product = await this._productRepository.findOneBy({ id });
      if (!product) {
        throw new NotFoundException(`product not found`);
      }
      await this._productRepository.delete(id);
      return `successfull remove a product with name ${product.name}`;
    } catch (error) {
      return `Failed to Delete the product :${error.message}`;
    }
  }
}
