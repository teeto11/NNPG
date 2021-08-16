import { Module } from '@nestjs/common';
import { BlogController } from '../blog-controller/blog-controller.controller';
import { BlogService } from '../blog-service/blog-service.service';
import { PrismaService } from '@dummy-project2/prisma';
@Module({
  exports:[BlogService],
  controllers: [BlogController],
  providers:[BlogService,PrismaService]
})
export class BlogModuleModule {}
