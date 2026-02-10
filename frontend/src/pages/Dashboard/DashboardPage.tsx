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
import { useQuery } from '@apollo/client/react';
import { LIST_TRANSACTIONS_QUERY } from '@/lib/graphql/queries/Transactions';
import { LIST_CATEGORIES_QUERY } from '@/lib/graphql/queries/Categories';
import type { Category, Transaction } from '@/types';
import { CreateTransactionDialog } from '../Transaction/components/CreateTransactionDialog';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

export function DashboardPage() {
	const [createDialogOpen, setCreateDialogOpen] = useState(false);

	const { data, refetch } = useQuery<{
		listTransactionsByUser: Transaction[];
	}>(LIST_TRANSACTIONS_QUERY);

	const transactions = data?.listTransactionsByUser || [];

	const { data: categoriesData } = useQuery<{
		listCategoriesByUser: Category[];
	}>(LIST_CATEGORIES_QUERY);

	const categories = categoriesData?.listCategoriesByUser || [];

	const formatCurrency = (value: number) =>
		new Intl.NumberFormat('pt-BR', {
			style: 'decimal',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(value);

	const totalBalance = transactions.reduce(
		(total, transaction) => total + transaction.amount,
		0,
	);

	const now = new Date();
	const currentMonth = now.getMonth();
	const currentYear = now.getFullYear();

	const { incomeThisMonth, expenseThisMonth } = transactions.reduce(
		(acc, transaction) => {
			const date = new Date(transaction.date);
			if (
				date.getMonth() !== currentMonth ||
				date.getFullYear() !== currentYear
			) {
				return acc;
			}
			if (transaction.amount >= 0) {
				acc.incomeThisMonth += transaction.amount;
			} else {
				acc.expenseThisMonth += Math.abs(transaction.amount);
			}
			return acc;
		},
		{ incomeThisMonth: 0, expenseThisMonth: 0 },
	);

	const categoryStats = categories
		.map((category) => {
			const categoryTransactions = transactions.filter(
				(transaction) => transaction.category.id === category.id,
			);
			const total = categoryTransactions.reduce(
				(sum, transaction) => sum + transaction.amount,
				0,
			);
			return {
				id: category.id,
				name: category.name,
				color: category.color,
				count: categoryTransactions.length,
				total,
			};
		})
		.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

	const handleOpenCreateDialog = () => {
		setCreateDialogOpen(true);
	};

	return (
		<>
			<section className="flex items-center justify-center w-full">
				<main className="grid grid-cols-3 gap-6 w-full max-w-6xl">
					<DashboardCard
						value={formatCurrency(totalBalance)}
						title="Saldo total"
						icon={<Wallet2Icon size={20} className="text-purple-base" />}
					/>
					<DashboardCard
						value={formatCurrency(incomeThisMonth)}
						title="Receitas do mês"
						icon={<CircleArrowUpIcon size={20} className="text-brand-base" />}
					/>
					<DashboardCard
						value={formatCurrency(expenseThisMonth)}
						title="Despesas do mês"
						icon={<CircleArrowDownIcon size={20} className="text-red-base" />}
					/>

					<Card className="col-span-2 border border-gray-200 bg-white shadow-sm gap-1">
						<CardHeader className="border-b border-gray-200">
							<CardTitle className="flex items-center justify-between gap-2 pt-4">
								<div className="text-xs font-medium uppercase text-gray-500">
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
						<CardContent className="text-gray-800 font-bold text-2xl border-b border-gray-200 pb-4 px-1">
							<DashboardTable transactions={transactions} />
						</CardContent>
						<CardFooter className="pt-5">
							<Button
								variant="link"
								onClick={handleOpenCreateDialog}
								className="text-sm text-brand-base w-full"
							>
								<PlusIcon size={14} className="inline-block" />
								Nova transação
							</Button>
						</CardFooter>
					</Card>
					<Card className="col-span-1 border border-gray-200 bg-white shadow-sm gap-1">
						<CardHeader className="border-b border-gray-200">
							<CardTitle className="flex items-center justify-between gap-2 pt-4">
								<div className="text-xs font-medium uppercase text-gray-500">
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
						<CardContent className="text-gray-800 px-1">
							<Table>
								<TableBody>
									{categoryStats.map((category) => {
										return (
											<TableRow key={category.id} className="border-none">
												<TableCell className="px-4 py-4">
													<div
														className={`text-${category.color}-base bg-${category.color}-light px-3 py-1 rounded-2xl inline-block font-medium text-xs`}
													>
														{category.name}
													</div>
												</TableCell>
												<TableCell className="px-4 py-4 text-xs text-gray-500 text-right">
													{category.count} itens
												</TableCell>
												<TableCell className="px-4 py-4 text-right text-sm">
													<div className="text-sm font-semibold text-gray-800">
														{category.total >= 0 ? '+' : '-'}R${' '}
														{formatCurrency(Math.abs(category.total))}
													</div>
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</main>
			</section>

			<CreateTransactionDialog
				open={createDialogOpen}
				onOpenChange={setCreateDialogOpen}
				onSuccess={refetch}
			/>
		</>
	);
}
