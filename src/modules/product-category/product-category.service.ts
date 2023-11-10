import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductCategoryDto } from './create-product-category.dto';
import { ProductCategory } from 'src/models/product-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateMessage } from 'src/messages/update.message';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private _productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async create(createProductCategoryDto: CreateProductCategoryDto) {
    try {
      const productCategory = await this._productCategoryRepository.findOne({
        where: { name: createProductCategoryDto.name },
      });

      if (productCategory) {
        throw new NotFoundException(`product category already exist`);
      }

      return this._productCategoryRepository.save(createProductCategoryDto);
    } catch (error) {
      throw new HttpException(
        `Failed to create!:${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<ProductCategory[]> {
    try {
      return await this._productCategoryRepository.find({
        relations: ['mizigo', 'wateja', 'products'],
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string): Promise<ProductCategory> {
    try {
      const productCategory = await this._productCategoryRepository.findOne({
        where: { id },
        relations: ['mizigo', 'wateja', 'products'],
      });
      if (!productCategory) {
        throw new NotFoundException(`product category not found`);
      }

      return productCategory;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async update(
    id: string,
    updateProductCategoryDto: CreateProductCategoryDto,
  ): Promise<any> {
    try {
      const productCategory = await this._productCategoryRepository.findOne({
        where: { id },
      });

      if (!productCategory) {
        throw new NotFoundException(`product category not found`);
      }

      productCategory.name = updateProductCategoryDto.name;
      await this._productCategoryRepository.save(productCategory);
      return productCategory;
    } catch (error) {
      return new UpdateMessage(
        false,
        `Failed to update product category: ${error.message}`,
      );
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const productCategory = await this._productCategoryRepository.findOneBy({
        id,
      });
      if (!productCategory) {
        throw new NotFoundException(`product category not found`);
      }
      await this._productCategoryRepository.delete(id);
      return JSON.stringify(
        `successfull remove a product category with  name${productCategory.name}`,
      );
    } catch (error) {
      return JSON.stringify(
        `Failed to Delete the product category:${error.message}`,
      );
    }
  }
}
