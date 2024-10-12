// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './api/articles/article.module';
import { ConfigModule } from '@nestjs/config';
import { SePracticesModule } from './api/se-practices/se-practices.module'; // Add this line


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI),
    ArticleModule,
    SePracticesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
