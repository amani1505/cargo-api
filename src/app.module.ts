import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './configuration/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProductCategoryModule } from './modules/product-category/product-category.module';
import { ProductModule } from './modules/product/product.module';
import { MtejaModule } from './modules/mteja/mteja.module';
import { MzigoModule } from './modules/mzigo/mzigo.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { InstitutionModule } from './modules/institution/institution.module';

@Module({
  imports: [
    DatabaseModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/uploads'),
    }),
    ProductCategoryModule,
    ProductModule,
    MtejaModule,
    MzigoModule,
    UserModule,
    AuthModule,
    InstitutionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
