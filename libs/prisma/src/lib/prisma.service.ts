import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated';


const prismaOptions = {
  log: [
    {
      emit: 'event' as const,
      level: 'query' as const,
    },
  ],
};
type PrismaOptions = typeof prismaOptions;

@Injectable()
export class PrismaService extends PrismaClient<PrismaOptions> implements OnModuleInit, OnModuleDestroy {

  constructor() {
    super(prismaOptions);
    this.$on('query', async e => {
      console.log(`${e.query}: ${e.params}`);
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
