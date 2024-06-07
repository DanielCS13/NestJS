import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkshopsModule } from './workshops/workshops.module';
import { PersonaModule } from './persona/persona.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // type: 'mysql',
      // username: 'root',
      // host: 'localhost',
      // port: 3306,
      // password: '',
      // database: 'empresa',
      //Create configuration with environment variables
      type: process.env.DB_CONNECTION,
      username: process.env.DB_USERNAME,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    WorkshopsModule,
    PersonaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
