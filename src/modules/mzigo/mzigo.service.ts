import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMzigoDto } from './create-mzigo.dto';
import { Mzigo } from 'src/models/mzigo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from 'src/models/product-category.entity';
import { Repository } from 'typeorm';
import { Mteja } from 'src/models/mteja.entity';
import { UpdateMessage } from 'src/messages/update.message';

@Injectable()
export class MzigoService {
  constructor(
    @InjectRepository(Mzigo)
    private _mzigoRepository: Repository<Mzigo>,
    @InjectRepository(ProductCategory)
    private _productCategoryRepository: Repository<ProductCategory>,
    @InjectRepository(Mteja)
    private _mtejaRepository: Repository<Mteja>,
  ) {}
  async create(createMzigoDto: CreateMzigoDto) {
    try {
      const productCategoryId = createMzigoDto.categoryId;
      const mtejaId = createMzigoDto.mtejaId;
      const cargoNo = createMzigoDto.cargo_no;

      const cargo = await this._mzigoRepository.findOne({
        where: { cargo_no: cargoNo },
      });
      if (cargo) {
        throw new NotFoundException(`product category already exist`);
      }

      const category = await this._productCategoryRepository.findOne({
        where: { id: productCategoryId },
      });
      const mteja = await this._mtejaRepository.findOne({
        where: { id: mtejaId },
      });

      if (!category) {
        throw new NotFoundException(`category not found`);
      }
      if (!mteja) {
        throw new NotFoundException(`mteja not found`);
      }

      const mzigo = this._mzigoRepository.create(createMzigoDto);
      mzigo.category = category;
      mzigo.mteja = mteja;

      return await this._mzigoRepository.save(mzigo);
    } catch (error) {
      throw new HttpException(
        `Failed to create!:${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<Mzigo[]> {
    try {
      return await this._mzigoRepository.find({
        relations: ['category', 'mteja'],
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string): Promise<Mzigo> {
    try {
      const mzigo = await this._mzigoRepository.findOne({
        where: { id },
        relations: ['category', 'mteja'],
      });
      if (!mzigo) {
        throw new NotFoundException(`mzigo not found`);
      }

      return mzigo;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async update(
    id: string,
    updateMzigoDto: CreateMzigoDto,
  ): Promise<UpdateMessage> {
    try {
      const product = await this._mzigoRepository.findOne({
        where: { id },
      });
      if (!product) {
        throw new NotFoundException(`mzigo not found`);
      }
      await this._mzigoRepository.update(id, updateMzigoDto);
      return new UpdateMessage(true, 'successfull update the mzigo');
    } catch (error) {
      return new UpdateMessage(
        false,
        `Failed to update mzigo: ${error.message}`,
      );
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const mzigo = await this._mzigoRepository.findOneBy({ id });
      if (!mzigo) {
        throw new NotFoundException(`mzigo not found`);
      }
      await this._mzigoRepository.delete(id);
      return JSON.stringify(
        `successfull remove a mzigo with cargo no ${mzigo.cargo_no}`,
      );
    } catch (error) {
      return JSON.stringify(`Failed to Delete the mzigo :${error.message}`);
    }
  }
}
