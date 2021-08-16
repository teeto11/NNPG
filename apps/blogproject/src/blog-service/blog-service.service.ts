import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import axios from 'axios';
import { PrismaService, Post, Prisma } from '@dummy-project2/prisma';
//import { Post, Prisma } from '@dummy-project2/generated';
export interface Blog {
  id: number;
  title?: string;
  userId?: number;
}
@Injectable()
export class BlogService {
  private blogs: Blog[] = [];
  constructor(private prisma: PrismaService) {}

  async fetch(): Promise<Blog[]> {
    const response: AxiosResponse = await axios.get(
      'https://jsonplaceholder.typicode.com/todos'
    );
    for (const value of response.data) {
      const { id, title } = value;
      const data = {
        postId: id,
        title: title,
        //  userId:Math.floor(Math.random() * 10) + 1,
      };
      this.blogs.push({ id, title });
      await this.savePost(data);
    }

    // response.data.forEach(element => {
    //   const { id, title } = element;
    //   const data = {
    //     postId: id,
    //     title: title,
    //   };
    //   this.blogs.push({ id, title });
    //    this.savePost(data);
    // });
    // console.log('Blogs', this.blogs);
    return this.blogs;
  }

  // async createUser(data: Prisma.UserCreateInput){
  //   const user = await this.prisma.user.create({
  //     data,
  //   });
  //   return user;
  // }
  async create(data: Prisma.PostCreateManyInput):Promise<Post> {
    const post = await this.prisma.post.create({
      data: {
        title: data.title,
        postId: data.postId,
        userId: data.userId,
      },
    });
    return post;
  }
  async savePost(
    data: Prisma.PostCreateManyInput
  ): Promise<Prisma.BatchPayload> {
    const createManyPost = await this.prisma.post.createMany({
      data,
      skipDuplicates: false,
    });
    return createManyPost;
  }

  async getOne(data: Prisma.PostWhereInput):Promise<Post> {
    const singlePost = await this.prisma.post.findFirst({
      where: {
        title: data.title,
      },
    });
    return singlePost;
  }
  async getAllPost() {
    const allPost = await this.prisma.post.findMany({
      select: {
        title: true,
        postId: true,
      },
    });
    console.log(allPost);
    return allPost;
  }
  async getUnique(data: Prisma.PostWhereUniqueInput):Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: {
        id: data.id,
      },
    });
    return post;
  }

  async updatePost(id: number, data: Prisma.PostUpdateInput):Promise<Post> {
    const post = await this.prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        title: data.title,
      },
    });
    return post;
  }
  async getAllUserPost(id:number):Promise<Post[]>{
    const posts = await this.prisma.post.findMany({
      where:{
        userId:id
      }
    });
    return posts
  }
}
