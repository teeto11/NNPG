import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {BlogModuleModule} from '../blog-module/blog-module.module'
import { GraphQLModule } from '@nestjs/graphql';
import { BlogResolver } from '../resolvers/blog.resolver';
import { BlogService } from '../blog-service/blog-service.service';
import { PrismaService } from '@dummy-project2/prisma';
import { UserModule } from '../user/user.module';
@Module({
  imports: [BlogModuleModule,UserModule,
            GraphQLModule.forRoot({
              autoSchemaFile:'apps/blogproject/graphqlschema/schema.gql',
              playground: true,
              sortSchema: true,
              debug: true,
            })
   ],
  controllers: [AppController],
  providers: [AppService,BlogResolver],

})
export class AppModule {}
