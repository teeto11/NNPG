import { Resolver,Args,ResolveField,Query,Parent,Mutation,Int} from "@nestjs/graphql"
import { Blog } from "../models/blog.model";
import { User } from "../models/user.model";
import { BlogService} from "../blog-service/blog-service.service";
import { UserService } from "../user/user.service";
@Resolver(() => Blog)
export class BlogResolver{
   constructor(private blogService:BlogService, private userService:UserService){}
   @Query(() => [Blog])
   async findAllPosts(){
     return await this.blogService.getAllPost()
   }

   @ResolveField(() => User,{name:"user",nullable:true})
   async user(@Parent() blog:Blog):Promise<User>{
      const {userId} = blog
      console.log(userId,"ID")
      return await this.userService.getUserBlog(userId);
   }

   @Mutation(() => Blog)
   async createPost(
     @Args("title") title:string,
     @Args("postId",{type:() =>Int}) postId:number
   ):Promise<Blog>{
     const data = {
       title,
       postId
     }
      return await this.blogService.create(data)
   }
  //  @ResolveField(() => Object)
  //    async getPostById(@Parent() blog: Blog){
  //       const {id} = blog
  //       return await this.blogService.findPostById(id);
  //    }
  //  }
}

