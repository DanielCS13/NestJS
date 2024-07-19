import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
// import session from 'express-session';
// import {createClient} from 'redis';
// import RedisStore from 'connect-redis';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // let redisClient = createClient()
  // redisClient.connect().catch(console.error);

  // let redisStore = new RedisStore({
  //   client: redisClient,
  //   prefix: 'session:',
  // });

  // app.use(
  //   session({
  //     store: redisStore,
  //     secret: 'my-secret',
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: { maxAge: 1000 * 60 * 60 },
  //   }),
  // );

  await app.listen(3000);
}
bootstrap();
