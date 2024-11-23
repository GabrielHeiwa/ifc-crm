import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NegotiationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: any) {
    await this.prismaService.negotiation.create({
      data: {
        discount: data.discount,
        description: data.description,
        totalValue: data.totalValue,
        clientId: data.clientId,
        supplierId: data.supplierId,
        status: data.status,
        NegotiationProduct: {
          createMany: {
            data: data.products.map((p: any) => ({ productId: p.id })),
          },
        },
      },
    });
  }

  async findAll() {
    const negotiations = await this.prismaService.negotiation.findMany({
      include: {
        client: {
          include: {
            user: true,
          },
        },
        supplier: {
          include: {
            user: true,
          },
        },
        NegotiationProduct: {
          include: {
            product: true,
          },
        },
      },
    });

    return negotiations;
  }

  findOne(id: string) {
    return `This action returns a #${id} negotiation`;
  }

  async update(id: string, data: any) {
    const negotiation = await this.prismaService.negotiation.findFirstOrThrow({
      where: { id },
    });

    await this.prismaService.negotiationProduct.deleteMany({
      where: { negotiationId: negotiation.id },
    });

    await this.prismaService.negotiation.update({
      where: {
        id: negotiation.id,
      },
      data: {
        clientId: data.clientId,
        description: data.description,
        discount: data.discount,
        supplierId: data.supplierId,
        totalValue: data.totalValue,
        status: data.status,
        NegotiationProduct: {
          createMany: {
            data: data.products.map((p: any) => ({ productId: p.id })),
          },
        },
      },
    });
  }

  async delete(id: string) {
    const negotiation = await this.prismaService.negotiation.findFirstOrThrow({
      where: { id },
    });

    await this.prismaService.negotiationProduct.deleteMany({
      where: {
        negotiationId: negotiation.id,
      },
    });

    await this.prismaService.negotiation.delete({
      where: {
        id: negotiation.id,
      },
    });
  }
}
