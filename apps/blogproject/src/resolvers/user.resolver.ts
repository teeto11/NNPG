import { Resolver,Args,ResolveField,Query,Parent, Int } from "@nestjs/graphql"
import { User } from "../models/user.model"
import { UserService } from "../user/user.service";
import { BlogService } from "../blog-service/blog-service.service";
import { Blog } from "../models/blog.model";
@Resolver(() => User)
export class UserResolver{

  constructor(private readonly user:UserService,private readonly blog:BlogService){}
  @Query(() => [User])
  async getAllUsers(){
    return await this.user.getUsers()
  }
  @Query(() => User)
  async getUser(@Args("id",{type:() => Int}) id:number){
    return await this.user.getUser(id)
  }

  @ResolveField('posts',() => [Blog])
  async getUserPost(@Parent() user:User){
    const {id} = user
    console.log(id,"here")
    return this.blog.getAllUserPost(id);
  }

  //mutation

  //resolve field
}
