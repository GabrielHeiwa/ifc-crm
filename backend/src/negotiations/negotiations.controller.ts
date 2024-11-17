import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { NegotiationsService } from './negotiations.service';
import { CreateNegotiationDto } from './dto/create-negotiation.dto';
import { Prisma } from '@prisma/client';

@Controller('negotiations')
export class NegotiationsController {
  constructor(private readonly negotiationsService: NegotiationsService) { }

  @Post()
  create(@Body() data: Prisma.NegotiationCreateInput) {
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
}
