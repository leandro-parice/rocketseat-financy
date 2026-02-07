import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

import { DashboardCard } from './components/DashboardCard';
import {
	ChevronRightIcon,
	CircleArrowDownIcon,
	CircleArrowUpIcon,
	PlusIcon,
	Wallet2Icon,
} from 'lucide-react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { DashboardTable } from './components/DashboardTable';

export function DashboardPage() {
	return (
		<>
			<section className="flex items-center justify-center w-full">
				<main className="grid grid-cols-3 gap-6 w-full max-w-6xl">
					<DashboardCard
						value="12.847,32"
						title="Saldo total"
						icon={<Wallet2Icon size={20} className="text-purple-base" />}
					/>
					<DashboardCard
						value="4.250,00"
						title="Receitas do mês"
						icon={<CircleArrowUpIcon size={20} className="text-brand-base" />}
					/>
					<DashboardCard
						value="2.180,45"
						title="Despesas do mês"
						icon={<CircleArrowDownIcon size={20} className="text-red-base" />}
					/>

					<Card className="col-span-2 border border-gray-200 bg-white shadow-sm gap-1">
						<CardHeader className="border-b border-gray-200">
							<CardTitle className="flex items-center justify-between gap-2">
								<div className="text-xs uppercase text-gray-500">
									Transações recentes
								</div>
								<Link
									to="/transactions"
									className="text-xs text-brand-base hover:underline"
								>
									Ver todas
									<ChevronRightIcon size={14} className="inline-block" />
								</Link>
							</CardTitle>
						</CardHeader>
						<CardContent className="text-gray-800 font-bold text-2xl border-b border-gray-200 pb-4">
							<DashboardTable />
						</CardContent>
						<CardFooter>
							<Button variant="link" className="text-sm text-brand-base w-full">
								<PlusIcon size={14} className="inline-block" />
								Ver todas as transações
							</Button>
						</CardFooter>
					</Card>
					<Card className="col-span-1 border border-gray-200 bg-white shadow-sm gap-1">
						<CardHeader className="border-b border-gray-200">
							<CardTitle className="flex items-center justify-between gap-2">
								<div className="text-xs uppercase text-gray-500">
									Categorias
								</div>
								<Link
									to="/categories"
									className="text-xs text-brand-base hover:underline"
								>
									Gerenciar
									<ChevronRightIcon size={14} className="inline-block" />
								</Link>
							</CardTitle>
						</CardHeader>
						<CardContent className="text-gray-800 font-bold text-2xl">
							R$
						</CardContent>
					</Card>
				</main>
			</section>
		</>
	);
}
