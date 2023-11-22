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
import { Institute } from 'src/models/institution.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private _productCategoryRepository: Repository<ProductCategory>,
    @InjectRepository(Institute)
    private _instituteRepository: Repository<Institute>,
  ) {}

  async create(createProductCategoryDto: CreateProductCategoryDto) {
    try {
      // const productCategory = await this._productCategoryRepository.findOne({
      //   where: { name: createProductCategoryDto.name },
      // });
      const institute = await this._instituteRepository.findOne({
        where: { id: createProductCategoryDto.instituteId },
      });
      // if (productCategory) {
      //   throw new NotFoundException(`product category already exist`);
      // }
      const productCategoryData = this._productCategoryRepository.create(
        createProductCategoryDto,
      );

      productCategoryData.institute = institute;
      return await this._productCategoryRepository.save(productCategoryData);
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
        relations: ['mizigo', 'wateja', 'products', 'institute'],
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string): Promise<ProductCategory> {
    try {
      const productCategory = await this._productCategoryRepository.findOne({
        where: { id },
        relations: ['mizigo', 'wateja', 'products', 'institute'],
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
      const institute = await this._instituteRepository.findOne({
        where: { id: updateProductCategoryDto.instituteId },
      });
      if (!productCategory) {
        throw new NotFoundException(`product category not found`);
      }

      productCategory.name = updateProductCategoryDto.name;
      productCategory.institute = institute;
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
