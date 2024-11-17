import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() data: Prisma.ProductCreateInput) {
    return this.productsService.create(data);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.productsService.update(id, data);
  }
}
