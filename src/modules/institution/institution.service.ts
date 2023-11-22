import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInstitutionDto } from './create-institution.dto';
import { Repository } from 'typeorm';
import { Institute } from 'src/models/institution.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateMessage } from 'src/messages/update.message';

@Injectable()
export class InstitutionService {
  constructor(
    @InjectRepository(Institute)
    private _instituteRepository: Repository<Institute>,
  ) {}
  async create(createInstitutionDto: CreateInstitutionDto) {
    try {
      const institute = this._instituteRepository.create(createInstitutionDto);

      return await this._instituteRepository.save(institute);
    } catch (error) {
      throw new HttpException(
        `Failed to create!:${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<Institute[]> {
    try {
      return await this._instituteRepository.find({
        relations: [
          'mizigo',
          'wateja',
          'products',
          'productCategories',
          'users',
        ],
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string): Promise<Institute> {
    try {
      const institute = await this._instituteRepository.findOne({
        where: { id },
        relations: ['mizigo', 'wateja', 'products', 'productCategories'],
      });
      if (!institute) {
        throw new NotFoundException(`institute not found`);
      }

      return institute;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async update(
    id: string,
    updateInstitutionDto: CreateInstitutionDto,
  ): Promise<any> {
    try {
      const institute = await this._instituteRepository.findOne({
        where: { id },
      });

      if (!institute) {
        throw new NotFoundException(`institute not found`);
      }

      institute.name = updateInstitutionDto.name;
      institute.location = updateInstitutionDto.location;
      institute.logo = updateInstitutionDto.logo;
      await this._instituteRepository.save(institute);
      return institute;
    } catch (error) {
      return new UpdateMessage(
        false,
        `Failed to update product category: ${error.message}`,
      );
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const institute = await this._instituteRepository.findOneBy({
        id,
      });
      if (!institute) {
        throw new NotFoundException(`institute not found`);
      }
      await this._instituteRepository.delete(id);
      return JSON.stringify(
        `successfull remove a institute with  name${institute.name}`,
      );
    } catch (error) {
      return JSON.stringify(`Failed to Delete the institute:${error.message}`);
    }
  }
}
