/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/models/user.entity';
import { UpdateMessage } from 'src/messages/update.message';
import * as bcrypt from 'bcrypt';
import { Institute } from 'src/models/institution.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private _userRepository: Repository<User>,
    @InjectRepository(Institute)
    private _instituteRepository: Repository<Institute>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this._userRepository.findOne({
        where: { email: createUserDto.email },
      });
      const institute = await this._instituteRepository.findOne({
        where: { id: createUserDto.instituteId },
      });
      if (user) {
        throw new NotFoundException(`user already exist`);
      }
      if (!institute) {
        throw new NotFoundException(`institute not found`);
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const createdUser = this._userRepository.create(createUserDto);
      createdUser.password = hashedPassword;
      createdUser.institute = institute;
      await this._userRepository.save(createdUser);

      const { password, ...userCreated } = createdUser;
      return userCreated;
    } catch (error) {
      throw new HttpException(
        `Failed to create!:${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this._userRepository.find({
        relations: ['institute'],
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this._userRepository.findOne({
        where: { id },
        relations: ['institute'],
      });
      if (!user) {
        throw new NotFoundException(`user not found`);
      }

      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findOneByUsername(username: string): Promise<User> {
    try {
      const user = await this._userRepository.findOne({
        where: { email: username },
        relations: ['institute'],
      });
      if (!user) {
        throw new NotFoundException(`user not found`);
      }

      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async update(
    id: string,
    updateUserDto: CreateUserDto,
  ): Promise<UpdateMessage> {
    try {
      const user = await this._userRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(`user not found`);
      }
      await this._userRepository.update(id, updateUserDto);
      return new UpdateMessage(true, 'successfull update the user');
    } catch (error) {
      return new UpdateMessage(
        false,
        `Failed to update user: ${error.message}`,
      );
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const user = await this._userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(`product category not found`);
      }
      await this._userRepository.delete(id);
      return `successfull remove a user with name${user.full_name}`;
    } catch (error) {
      return `Failed to Delete the user:${error.message}`;
    }
  }
}
