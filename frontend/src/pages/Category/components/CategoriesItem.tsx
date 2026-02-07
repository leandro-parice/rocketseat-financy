import { Button } from '@/components/ui/button';
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
} from '@/components/ui/card';
import type { Category } from '@/types';
import { ICON_OPTIONS } from '@/types';
import { EditIcon, TrashIcon, UtensilsIcon } from 'lucide-react';

interface CategoriesItemProps {
	category: Category;
	onEdit?: (category: Category) => void;
}

const COLOR_CLASS_MAP: Record<string, { text: string; background: string }> = {
	green: { text: 'text-green-base', background: 'bg-green-light' },
	blue: { text: 'text-blue-base', background: 'bg-blue-light' },
	purple: { text: 'text-purple-base', background: 'bg-purple-light' },
	pink: { text: 'text-pink-base', background: 'bg-pink-light' },
	red: { text: 'text-red-base', background: 'bg-red-light' },
	orange: { text: 'text-orange-base', background: 'bg-orange-light' },
	yellow: { text: 'text-yellow-base', background: 'bg-yellow-light' },
};

export function CategoriesItem({ category, onEdit }: CategoriesItemProps) {
	const SelectedIcon =
		ICON_OPTIONS.find((option) => option.value === category.icon)?.Icon ??
		UtensilsIcon;

	const colorClasses = COLOR_CLASS_MAP[category.color] ?? {
		text: 'text-gray-500',
		background: 'bg-gray-100',
	};

	return (
		<Card className="w-full border border-gray-200 bg-white shadow-sm gap-1">
			<CardHeader className="mb-3">
				<div className="flex justify-between mb-6">
					<div
						className={`w-8 h-8 flex justify-center items-center rounded-md shadow-sm gap-1 ${colorClasses.text} ${colorClasses.background}`}
					>
						<SelectedIcon className="w-4 h-4" />
					</div>
					<div className="flex justify-center gap-3">
						<Button className="w-8 h-8 border border-gray-200 bg-white shadow-sm gap-1 text-red-base hover:bg-red-light hover:text-red-dark">
							<TrashIcon />
						</Button>
						<Button
							className="w-8 h-8 border border-gray-200 bg-white shadow-sm gap-1 hover:bg-gray-100 hover:text-gray-700"
							onClick={() => onEdit?.(category)}
						>
							<EditIcon />
						</Button>
					</div>
				</div>
				<CardTitle className="text-gray-800 font-bold">
					{category.name}
				</CardTitle>
				<CardDescription className="text-xs flex items-center gap-1 text-gray-500 font-normal">
					{category.description || 'Categoria sem descrição'}
				</CardDescription>
			</CardHeader>
			<CardContent className="text-xs text-right text-gray-500 font-normal">
				{category.transactionsCount}{' '}
				{category.transactionsCount === 1 ? 'item' : 'itens'}
			</CardContent>
		</Card>
	);
}
