import { Module } from '@nestjs/common';
import { NegotiationsService } from './negotiations.service';
import { NegotiationsController } from './negotiations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [NegotiationsController],
  providers: [NegotiationsService],
})
export class NegotiationsModule { }
