import { CategoriesCard } from './components/CategoriesCard';
import { ArrowDownUpIcon, PlusIcon, TagIcon, UtensilsIcon } from 'lucide-react';
import { CategoriesItem } from './components/CategoriesItem';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { LIST_CATEGORIES_QUERY } from '@/lib/graphql/queries/Categories';
import type { Category } from '@/types';
import { CreateCategoryDialog } from './components/CreateCategoryDialog';
import { EditCategoryDialog } from './components/EditCategoryDialog';
import { DeleteCategoryDialog } from './components/DeleteCategoryDialog';
import { ICON_OPTIONS } from '@/types';

export function CategoriesPage() {
	const [createDialogOpen, setCreateDialogOpen] = useState(false);
	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(
		null,
	);

	const { data, refetch } = useQuery<{
		listCategoriesByUser: Category[];
	}>(LIST_CATEGORIES_QUERY);

	const categories = data?.listCategoriesByUser || [];

	const totalTransactions = categories.reduce(
		(total, category) => total + category.transactionsCount,
		0,
	);

	const mostUsedCategory =
		categories.length > 0
			? categories.reduce((mostUsed, current) =>
					current.transactionsCount > mostUsed.transactionsCount
						? current
						: mostUsed,
				)
			: null;

	const MostUsedIcon = mostUsedCategory
		? (ICON_OPTIONS.find((option) => option.value === mostUsedCategory.icon)
				?.Icon ?? UtensilsIcon)
		: UtensilsIcon;

	const mostUsedColor = mostUsedCategory ? mostUsedCategory.color : 'gray';

	const handleOpenCreateDialog = () => {
		setCreateDialogOpen(true);
	};

	const handleOpenEditDialog = (category: Category) => {
		setSelectedCategory(category);
		setEditDialogOpen(true);
	};

	const handleOpenDeleteDialog = (category: Category) => {
		setSelectedCategory(category);
		setDeleteDialogOpen(true);
	};

	return (
		<>
			<section className="flex flex-col gap-6 items-center justify-center w-full">
				<div className="flex flex-col gap-6 items-start justify-center w-full max-w-6xl">
					<div className="pt-6 flex justify-between items-center w-full mb-6">
						<div className="flex flex-col gap-1">
							<h1 className="text-3xl font-bold text-gray-800">Categorias</h1>
							<span className="text-gray-600">
								Organize suas transações por categorias
							</span>
						</div>
						<Button
							className="bg-brand-base text-white hover:bg-brand-dark flex items-center"
							onClick={handleOpenCreateDialog}
						>
							<PlusIcon className="w-4 h-4 mr-1" />
							Nova categoria
						</Button>
					</div>
					<main className="w-full max-w-6xl grid grid-cols-12 gap-6">
						<div className="col-span-12 md:col-span-6 lg:col-span-4">
							<CategoriesCard
								title={categories.length.toString()}
								description="Total de categorias"
								icon={<TagIcon className="w-6 h-6 mt-1" />}
							/>
						</div>
						<div className="col-span-12 md:col-span-6 lg:col-span-4">
							<CategoriesCard
								title={totalTransactions.toString()}
								description="Total de transações"
								icon={
									<ArrowDownUpIcon className="w-6 h-6 mt-1 text-purple-base" />
								}
							/>
						</div>
						<div className="col-span-12 md:col-span-6 lg:col-span-4">
							<CategoriesCard
								title={mostUsedCategory?.name ?? 'Sem dados'}
								description="Categoria mais utilizada"
								icon={
									<MostUsedIcon
										className={`w-6 h-6 mt-1 text-${mostUsedColor}-base`}
									/>
								}
							/>
						</div>

						{categories.map((category) => (
							<div
								key={category.id}
								className="col-span-12 md:col-span-6 lg:col-span-3"
							>
								<CategoriesItem
									category={category}
									onEdit={handleOpenEditDialog}
									onDelete={handleOpenDeleteDialog}
								/>
							</div>
						))}
					</main>
				</div>
			</section>

			<CreateCategoryDialog
				open={createDialogOpen}
				onOpenChange={setCreateDialogOpen}
				onSuccess={refetch}
			/>

			{selectedCategory && (
				<EditCategoryDialog
					open={editDialogOpen}
					onOpenChange={setEditDialogOpen}
					category={selectedCategory}
					onSuccess={refetch}
				/>
			)}

			{selectedCategory && (
				<DeleteCategoryDialog
					open={deleteDialogOpen}
					onOpenChange={setDeleteDialogOpen}
					category={selectedCategory}
					onSuccess={refetch}
				/>
			)}
		</>
	);
}
