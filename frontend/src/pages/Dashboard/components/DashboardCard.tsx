import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface DashboardCardProps {
	value: string;
	title: string;
	icon: React.ReactNode;
}

export function DashboardCard({ value, title, icon }: DashboardCardProps) {
	return (
		<Card className="basis-1/3 border border-gray-200 bg-white shadow-sm gap-1">
			<CardHeader>
				<CardTitle className="text-xs flex items-center gap-2 text-gray-500 uppercase font-normal">
					{icon}
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent className="text-gray-800 font-bold text-2xl">
				R$ {value}
			</CardContent>
		</Card>
	);
}
