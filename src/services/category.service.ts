import { prismaClient } from '../../prisma/prisma';
import {
	CreateCategoryInput,
	EditCategoryInput,
} from '../dtos/input/category.input';

export class CategoryService {
	async createCategory(data: CreateCategoryInput, userId: string) {
		return prismaClient.category.create({
			data: {
				name: data.name,
				userId: userId,
			},
		});
	}

	async editCategory(data: EditCategoryInput, userId: string) {
		const category = await prismaClient.category.findUnique({
			where: { id: data.id, userId: userId },
		});

		if (!category) {
			throw new Error('Category not found');
		}

		return prismaClient.category.update({
			where: { id: data.id, userId: userId },
			data: {
				name: data.name,
			},
		});
	}
}
