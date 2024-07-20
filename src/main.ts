import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as expressSession from 'express-session';
import * as cookieParser from 'cookie-parser';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:4321',
    credentials: true,
  });

  app.use(
    expressSession({
      name: 'session',
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: false,
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
