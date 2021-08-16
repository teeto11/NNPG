import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import axios from 'axios';
import { PrismaService, User, Prisma } from '@dummy-project2/prisma';
@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prismaService.user.create({
      data,
    });
    return user;
  }
  async getUsers() {
    const allUserPost = await this.prismaService.user.findMany({
      select: {
        name: true,
        email: true,
      },
    });
    return allUserPost;
  }

  async getUser(id: number) {
    const allPost = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    console.log(allPost);
    return allPost;
  }

  async getUserBlog(userId: number) {
    if (userId) {
      const allUserById = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
      });
    return allUserById;
    }
  }
}
