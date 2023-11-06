import { Module } from "@nestjs/common";
// import { AppDataSource } from "./database.providers";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + "/../models/**/*.entity{.ts,.js}"],
        synchronize:true,
        ssl: {
          rejectUnauthorized: false, // ignore self-signed SSL certificates (not recommended for production)
          // You can also provide the path to your SSL certificate files here if you are using certificate-based authentication
        },
      }),
    }),
  ],
})
export class DatabaseModule {}

