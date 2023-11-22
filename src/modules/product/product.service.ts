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
import { Institute } from 'src/models/institution.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private _productRepository: Repository<Product>,
    @InjectRepository(ProductCategory)
    private _productCategoryRepository: Repository<ProductCategory>,
    @InjectRepository(Institute)
    private _instituteRepository: Repository<Institute>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const productCategoryId = createProductDto.categoryId;

      const category = await this._productCategoryRepository.findOne({
        where: { id: productCategoryId },
      });
      const institute = await this._instituteRepository.findOne({
        where: { id: createProductDto.instituteId },
      });

      if (!category) {
        throw new NotFoundException(`category not found`);
      }
      if (!institute) {
        throw new NotFoundException(`institute not found`);
      }

      const product = this._productRepository.create(createProductDto);
      product.category = category;
      product.institute = institute;
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
        relations: ['category', 'institute'],
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      const product = await this._productRepository.findOne({
        where: { id },
        relations: ['category', 'institute'],
      });
      if (!product) {
        throw new NotFoundException(`product not found`);
      }

      return product;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
  async update(id: string, updateProductDto: CreateProductDto): Promise<any> {
    try {
      const product = await this._productRepository.findOne({
        where: { id },
      });
      if (!product) {
        throw new NotFoundException(`product not found`);
      }

      const category = await this._productCategoryRepository.findOne({
        where: { id: updateProductDto.categoryId },
      });
      const institute = await this._instituteRepository.findOne({
        where: { id: updateProductDto.instituteId },
      });

      if (!category) {
        throw new NotFoundException(`category not found`);
      }

      if (!institute) {
        throw new NotFoundException(`institute not found`);
      }
      product.name = updateProductDto.name;
      product.category = category;
      product.institute = institute;

      await this._productRepository.save(product);

      return product;
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
      return JSON.stringify(
        `successfull remove a product with name ${product.name}`,
      );
    } catch (error) {
      return JSON.stringify(`Failed to Delete the product :${error.message}`);
    }
  }
}
