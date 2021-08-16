import { Controller, Get, Param, Post, Put, Req, Res,Body} from '@nestjs/common';

import { Request, Response } from '@nestjs/common';
import { BlogService } from '../blog-service/blog-service.service';
import { Blog } from '../blog-service/blog-service.service';
type RequestType = string|number|undefined
interface requestFromBody{
   body: {[key:string]:RequestType}

}
@Controller('blog-controller')
export class BlogController {
  constructor(private blogservice: BlogService) {}
  @Get('')
  findAll(@Req() req: requestFromBody, res: Response): Promise<Blog[]> {
    const blogs = this.blogservice.fetch();
    return blogs;
  }

  // @Post("/create-user")
  //  createUser(@Body() postData:{name:string;email:string}):Promise<Blog>{
  //   //const {title,postId,userId}  = req.body
  //  // const {age} : {age:number} = person;
  //   const blog = this.blogservice.create(postData);
  //   return blog;
  // }
  @Post("/create-post")
  create(@Body() postData:{title:string;postId:number;userId:number}):Promise<Blog>{
    //const {title,postId,userId}  = req.body
   // const {age} : {age:number} = person;
    const blog = this.blogservice.create(postData);
    return blog;
  }

  @Get('/post')
  getOneFromDb() {
    const data = {
      title: 'delectus aut autem',
    };
    const post = this.blogservice.getOne(data);
    return post;
  }
  @Get('/post/all')
  getAllFromDb() {
    const posts = this.blogservice.getAllPost();
    return posts;
  }

  @Get('/post/unique')
  getUnique() {
    const data = {
      id: 2,
    };
    const post = this.blogservice.getUnique(data);
    return post;
  }
  @Put('/post/:id')
  async updatePost(@Param('id') id:number, @Body() data:{title:string},) {

    const updatePost = await this.blogservice.updatePost(id,data);
    return updatePost


  }
}
