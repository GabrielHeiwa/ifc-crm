import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { NegotiationsModule } from './negotiations/negotiations.module';

@Module({
  imports: [UsersModule, PrismaModule, ProductsModule, NegotiationsModule],
})
export class AppModule {}
