import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { NegotiationsService } from './negotiations.service';
import { CreateNegotiationDto } from './dto/create-negotiation.dto';
import { Prisma } from '@prisma/client';

@Controller('negotiations')
export class NegotiationsController {
  constructor(private readonly negotiationsService: NegotiationsService) { }

  @Post()
  create(@Body() data: any) {
    return this.negotiationsService.create(data);
  }

  @Get()
  findAll() {
    return this.negotiationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.negotiationsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.negotiationsService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.negotiationsService.delete(id);
  }
}
