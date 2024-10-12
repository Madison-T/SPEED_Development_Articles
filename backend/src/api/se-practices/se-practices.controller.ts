// src/api/se-practices/se-practices.controller.ts
import { Controller, Get } from '@nestjs/common';
import { SePracticesService } from './se-practices.service';

@Controller('api/se-practices')
export class SePracticesController {
  constructor(private readonly sePracticesService: SePracticesService) {}

  @Get('/')
  async findAll() {
    return this.sePracticesService.findAll();
  }
}
