import { Field,ObjectType,Int} from "@nestjs/graphql";
import { User } from "./user.model";
@ObjectType()
export class Blog{
  @Field(() => Int)
   id:number
  @Field(() => Int)
  postId:number
  @Field()
  title:string
  userId:number
  // @Field()
  // user:User
}
