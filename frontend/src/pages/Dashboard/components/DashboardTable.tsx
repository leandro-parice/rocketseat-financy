import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import type { Transaction } from '@/types';
import { ICON_OPTIONS } from '@/types';
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from 'lucide-react';

interface DashboardTableProps {
	transactions: Transaction[];
}

export function DashboardTable({ transactions }: DashboardTableProps) {
	const formatCurrency = (value: number) =>
		new Intl.NumberFormat('pt-BR', {
			style: 'decimal',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(value);

	const recentTransactions = [...transactions]
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 5);

	return (
		<Table>
			<TableBody className="[&_tr]:border-gray-200 text-gray-600 text-sx">
				{recentTransactions.map((transaction) => {
					const Icon =
						ICON_OPTIONS.find(
							(option) => option.value === transaction.category.icon,
						)?.Icon ?? null;

					return (
						<TableRow key={transaction.id}>
							<TableCell className="px-4 py-4">
								<div className="flex items-center gap-3">
									<div
										className={`w-8 h-8 flex items-center justify-center text-${transaction.category.color}-base bg-${transaction.category.color}-light rounded-md`}
									>
										{Icon && <Icon className="w-4 h-4" />}
									</div>
									<div className="flex flex-col">
										<span className="font-medium text-gray-800">
											{transaction.description ?? 'Sem descrição'}
										</span>
										<span className="text-sm text-gray-600 font-normal">
											{new Date(transaction.date).toLocaleDateString('pt-BR', {
												timeZone: 'UTC',
											})}
										</span>
									</div>
								</div>
							</TableCell>
							<TableCell className="px-4 py-4 text-sm text-center">
								<div
									className={`text-${transaction.category.color}-base bg-${transaction.category.color}-light px-3 py-1 rounded-2xl inline-block font-medium text-xs`}
								>
									{transaction.category.name}
								</div>
							</TableCell>
							<TableCell className="px-4 py-4 text-right text-sm">
								<span className="text-sm font-semibold text-gray-800">
									{transaction.amount >= 0 ? '+' : '-'}R${' '}
									{formatCurrency(Math.abs(transaction.amount))}
									{transaction.amount >= 0 ? (
										<ArrowUpCircleIcon
											size={14}
											className="inline-block text-green-base ml-1"
										/>
									) : (
										<ArrowDownCircleIcon
											size={14}
											className="inline-block text-red-base ml-1"
										/>
									)}
								</span>
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
