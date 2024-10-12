// src/api/se-practices/se-practices.module.ts
import { Module } from '@nestjs/common';
import { SePracticesController } from './se-practices.controller';
import { SePracticesService } from './se-practices.service';

@Module({
  controllers: [SePracticesController],
  providers: [SePracticesService],
})
export class SePracticesModule {}
