import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateCategoryInput {
	@Field(() => String)
	name!: string;
}

@InputType()
export class EditCategoryInput {
	@Field(() => String)
	id!: string;

	@Field(() => String)
	name!: string;
}
