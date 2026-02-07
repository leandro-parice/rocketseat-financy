import { Card, CardContent } from '@/components/ui/card';

interface CategoriesCardProps {
	title: string;
	description: string;
	icon: React.ReactNode;
}

export function CategoriesCard({
	title,
	description,
	icon,
}: CategoriesCardProps) {
	return (
		<Card className="w-full border border-gray-200 bg-white shadow-sm gap-1">
			<CardContent className="text-gray-800 font-bold text-2xl">
				<div className="flex gap-6 items-start justify-start">
					{icon}
					<div className="flex flex-col gap-1">
						{title}
						<span className="text-xs flex items-center gap-1 text-gray-500 uppercase font-normal">
							{description}
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
