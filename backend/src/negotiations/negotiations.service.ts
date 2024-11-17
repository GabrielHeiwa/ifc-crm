import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NegotiationsService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(data: Prisma.NegotiationCreateInput) {
    return await this.prismaService.negotiation.create({
      data: {
        ...data,
        NegotiationProduct: {
          createMany: {
            data: [
              {
                productId: "82c7720f-9959-49af-a124-b88fd37a7784"
              }
            ]
          }
        }
      }
    });
  }

  async findAll() {
    const negotiations = await this.prismaService.negotiation.findMany({
      include: {
        client: {
          include: {
            user: true
          }
        },
        supplier: {
          include: {
            user: true
          }
        },
        NegotiationProduct: {
          include: {
            product: true
          }
        }
      }
    });

    return negotiations;
  }

  findOne(id: string) {
    return `This action returns a #${id} negotiation`;
  }
}
