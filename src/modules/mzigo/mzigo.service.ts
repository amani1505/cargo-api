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
import { Institute } from 'src/models/institution.entity';
import { UpdateMzigoDto } from './update-mzigo.dto';

@Injectable()
export class MzigoService {
  constructor(
    @InjectRepository(Mzigo)
    private _mzigoRepository: Repository<Mzigo>,
    @InjectRepository(ProductCategory)
    private _productCategoryRepository: Repository<ProductCategory>,
    @InjectRepository(Mteja)
    private _mtejaRepository: Repository<Mteja>,
    @InjectRepository(Institute)
    private _instituteRepository: Repository<Institute>,
  ) {}
  async create(createMzigoDto: CreateMzigoDto) {
    try {
      const institute = await this._instituteRepository.findOne({
        where: { id: createMzigoDto.instituteId },
      });
      const cargo = await this._mzigoRepository.findOne({
        where: { cargo_no: createMzigoDto.cargo_no },
      });
      const category = await this._productCategoryRepository.findOne({
        where: { id: createMzigoDto.categoryId },
      });
      const mteja = await this._mtejaRepository.findOne({
        where: { id: createMzigoDto.mtejaId },
      });

      if (cargo) {
        throw new NotFoundException(`cargo already exist`);
      }

      if (!category) {
        throw new NotFoundException(`category not found`);
      }
      if (!mteja) {
        throw new NotFoundException(`mteja not found`);
      }
      if (!institute) {
        throw new NotFoundException(`institute not found`);
      }

      const mzigo = this._mzigoRepository.create(createMzigoDto);
      mzigo.category = category;
      mzigo.mteja = mteja;
      mzigo.institute = institute;

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
        relations: ['category', 'mteja', 'institute'],
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
  async findOne(id: string): Promise<Mzigo> {
    try {
      const mzigo = await this._mzigoRepository.findOne({
        where: { id },
        relations: ['category', 'mteja', 'institute'],
      });
      if (!mzigo) {
        throw new NotFoundException(`mzigo not found`);
      }

      return mzigo;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateMzigoDto: UpdateMzigoDto): Promise<any> {
    try {
      const mzigo = await this._mzigoRepository.findOne({
        where: { id },
      });
      if (!mzigo) {
        throw new NotFoundException(`mzigo not found`);
      }

      const category = await this._productCategoryRepository.findOne({
        where: { id: updateMzigoDto.categoryId },
      });
      const mteja = await this._mtejaRepository.findOne({
        where: { id: updateMzigoDto.mtejaId },
      });

      if (!category) {
        throw new NotFoundException(`category not found`);
      }
      if (!mteja) {
        throw new NotFoundException(`mteja not found`);
      }

      mzigo.cargo_no = updateMzigoDto.cargo_no;
      mzigo.status = updateMzigoDto.status;
      mzigo.tarehe_ya_kutoka = updateMzigoDto.tarehe_ya_kutoka;
      mzigo.uzito = updateMzigoDto.uzito;
      mzigo.category = category;
      mzigo.mteja = mteja;

      await this._mzigoRepository.save(mzigo);
      return mzigo;
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
