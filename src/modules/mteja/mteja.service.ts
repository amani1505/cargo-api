import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UpdateMessage } from 'src/messages/update.message';
import { Mteja } from 'src/models/mteja.entity';
import { ProductCategory } from 'src/models/product-category.entity';
import { CreateMtejaDto } from './create-mteja.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MtejaService {
  constructor(
    @InjectRepository(Mteja)
    private _mtejaRepository: Repository<Mteja>,
    @InjectRepository(ProductCategory)
    private _productCategoryRepository: Repository<ProductCategory>,
  ) {}
  async create(createMtejaDto: CreateMtejaDto) {
    try {
      const productCategoryId = createMtejaDto.categoryId;

      const category = await this._productCategoryRepository.findOne({
        where: { id: productCategoryId },
      });

      if (!category) {
        throw new NotFoundException(`category not found`);
      }
      const mteja = this._mtejaRepository.create(createMtejaDto);
      mteja.category = category;
      return await this._mtejaRepository.save(mteja);
    } catch (error) {
      throw new HttpException(
        `Failed to create!:${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<Mteja[]> {
    try {
      return await this._mtejaRepository.find({
        relations: ['category'],
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string): Promise<Mteja> {
    try {
      const mteja = await this._mtejaRepository.findOne({
        where: { id },
        relations: ['category'],
      });
      if (!mteja) {
        throw new NotFoundException(`mteja not found`);
      }

      return mteja;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateMtejaDto: CreateMtejaDto): Promise<any> {
    try {
      const mteja = await this._mtejaRepository.findOne({
        where: { id },
      });
      if (!mteja) {
        throw new NotFoundException(`mteja not found`);
      }
      const productCategoryId = updateMtejaDto.categoryId;

      const category = await this._productCategoryRepository.findOne({
        where: { id: productCategoryId },
      });

      if (!category) {
        throw new NotFoundException(`category not found`);
      }

      mteja.jina_la_mteja = updateMtejaDto.jina_la_mteja;
      mteja.location_ya_mteja = updateMtejaDto.location_ya_mteja;
      mteja.namba_ya_simu = updateMtejaDto.namba_ya_simu;
      mteja.category = category;

      await this._mtejaRepository.save(mteja);
      return mteja;
    } catch (error) {
      return new UpdateMessage(
        false,
        `Failed to update mteja: ${error.message}`,
      );
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const mteja = await this._mtejaRepository.findOneBy({ id });
      if (!mteja) {
        throw new NotFoundException(`mteja not found`);
      }
      await this._mtejaRepository.delete(id);
      return JSON.stringify(
        `successfull remove a mteja with name ${mteja.jina_la_mteja}`,
      );
    } catch (error) {
      return JSON.stringify(`Failed to Delete the mteja :${error.message}`);
    }
  }
}
