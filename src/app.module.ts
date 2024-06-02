import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkshopsModule } from './workshops/workshops.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      host: 'localhost',
      port: 3306,
      password: '',
      database: 'video-club',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    WorkshopsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
