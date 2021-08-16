import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserResolver } from '../resolvers/user.resolver';
import { PrismaService } from '@dummy-project2/prisma';
import { BlogService } from '../blog-service/blog-service.service';
@Module({
  exports: [UserService],
  controllers: [UserController],
  providers:[UserService,PrismaService,UserResolver,BlogService]
})
export class UserModule {}
