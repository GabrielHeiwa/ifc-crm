import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Supplier } from './entities/supplier.entity';
import { Client } from './entities/client.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    if (!['USER', 'CLIENT', 'SUPPLIER'].includes(createUserDto.userType))
      throw new Error('USER TYPE INVALID');

    const strategy = {
      USER: async (data: CreateUserDto) => {
        const user = new User();
        user.email = data.email;
        user.password = data.password;

        return await this.prismaService.user.create({ data: user });
      },
      SUPPLIER: async (data: CreateUserDto) => {
        const user = new User();
        user.email = data.email;
        user.password = data.password;

        const supplier = new Supplier();
        supplier.cnpj = data.cnpj;

        return await this.prismaService.supplier.create({
          data: {
            ...supplier,
            user: {
              create: user,
            },
          },
        });
      },
      CLIENT: async (data: CreateUserDto) => {
        const user = new User();
        user.email = data.email;
        user.password = data.password;

        const client = new Client();
        client.cpf = data.cpf;

        return await this.prismaService.client.create({
          data: {
            ...client,
            user: {
              create: user,
            },
          },
        });
      },
    };

    return strategy[createUserDto.userType](createUserDto);
  }

  async findAll() {
    const users = await this.prismaService.user.findMany({
      include: {
        Client: true,
        Supplier: true,
      },
    });

    return users;
  }

  async findAllClients() {
    const clients = await this.prismaService.client.findMany({
      include: {
        user: true,
      },
    });

    return clients;
  }

  async findAllSuppliers() {
    const suppliers = await this.prismaService.supplier.findMany({
      include: {
        user: true,
      },
    });

    return suppliers;
  }

  async delete(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: { Client: true, Supplier: true },
    });

    if (!user) throw new Error('Usuário não encontrado');

    if (user.Client.length) {
      await this.prismaService.client.deleteMany({
        where: { userId: user.id },
      });
    }

    if (user.Supplier.length) {
      await this.prismaService.supplier.deleteMany({
        where: { userId: user.id },
      });
    }

    await this.prismaService.user.delete({ where: { id: user.id } });

    return { message: 'Usuário deletado com sucesso' };
  }

  async update(id: string, data: any) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: { Client: true, Supplier: true },
    });

    if (!user) throw new Error('Usuário não encontrado');

    if (data.cpf) {
      await this.prismaService.client.updateMany({
        where: { userId: user.id },
        data: { cpf: data.cpf },
      });
    }

    if (data.cnpj) {
      await this.prismaService.supplier.updateMany({
        where: { userId: user.id },
        data: { cnpj: data.cnpj },
      });
    }

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { email: data.email },
    });

    return { message: 'Usuário atualizado com sucesso.' };
  }
}
