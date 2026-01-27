import { createParameterDecorator, ResolverData } from 'type-graphql';
import { User } from '@prisma/client';
import { GraphQLContext } from '../context';
import { prismaClient } from '../../../prisma/prisma';

export const GqlUser = () => {
	return createParameterDecorator(
		async ({ context }: ResolverData<GraphQLContext>): Promise<User | null> => {
			if (!context || !context.user) {
				return null;
			}

			try {
				const user = await prismaClient.user.findUnique({
					where: { id: context.user },
				});
				if (!user) {
					throw new Error('User not found');
				}
				return user;
			} catch (error) {
				console.error('Error fetching user in GqlUser decorator:', error);
				throw error;
			}
		},
	);
};
