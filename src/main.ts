import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { ExpressAdapter } from "@nestjs/platform-express";

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule, new ExpressAdapter());
  app.enableCors();

  const appPort = process.env.APP_PORT || 4000;
  const appHost = process.env.APP_HOST || "0.0.0.0";
  await app.listen(appPort, appHost);
}
bootstrap();
