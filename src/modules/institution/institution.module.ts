import { Module } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { InstitutionController } from './institution.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institute } from 'src/models/institution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Institute])],
  controllers: [InstitutionController],
  providers: [InstitutionService],
})
export class InstitutionModule {}
