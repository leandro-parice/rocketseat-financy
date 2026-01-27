import { Field, GraphQLISODateTime, ID, ObjectType } from 'type-graphql';
import { UserModel } from './user.model';

@ObjectType()
export class CategoryModel {
	@Field(() => ID)
	id!: string;

	@Field(() => String)
	name!: string;

	@Field(() => String)
	userId!: string;

	@Field(() => UserModel, { nullable: true })
	user?: UserModel;

	@Field(() => GraphQLISODateTime)
	createdAt!: Date;

	@Field(() => GraphQLISODateTime)
	updatedAt!: Date;
}
