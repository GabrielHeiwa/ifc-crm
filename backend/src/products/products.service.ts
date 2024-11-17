import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.ProductCreateInput) {
    const product = await this.prismaService.product.create({ data });

    return product;
  }

  async findAll() {
    const products = await this.prismaService.product.findMany({ where: { deletedAt: null }});

    return products;
  }

  async delete(id: string) {
    await this.prismaService.product.findFirstOrThrow({
      where: { id },
    });

    await this.prismaService.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Produto deletado com sucesso' };
  }

  async update(id: string, data: any) {
    await this.prismaService.product.findFirstOrThrow({ where: { id } });

    await this.prismaService.product.update({
      where: { id },
      data: {
        description: data.description,
        name: data.name,
        price: data.price,
      },
    });

    return { message: 'Produto atualizado com sucesso' };
  }
}
