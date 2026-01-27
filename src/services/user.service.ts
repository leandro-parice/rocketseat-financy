import { prismaClient } from '../../prisma/prisma';
import { CreateUserInput } from '../dtos/input/user.input';

export class UserService {
	async findUser(id: string) {
		const user = await prismaClient.user.findUnique({
			where: { id },
		});

		if (!user) {
			throw new Error('User not found');
		}

		return user;
	}

	async createUser(data: CreateUserInput) {
		const findUser = await prismaClient.user.findUnique({
			where: { email: data.email },
		});

		if (findUser) {
			throw new Error('Email already in use');
		}

		const user = await prismaClient.user.create({
			data: {
				name: data.name,
				email: data.email,
				password: data.password,
			},
		});

		return user;
	}
}
