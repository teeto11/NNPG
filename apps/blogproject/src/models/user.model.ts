import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Blog } from './blog.model';
@ObjectType()
export class User {
  @Field(() => Int)
  id: number;
  @Field()
  name: string;
  @Field()
  email: string;
  // @Field(() => [Blog])
  // posts: Blog[];
}
