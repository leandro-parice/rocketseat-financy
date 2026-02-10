import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import type { Transaction } from '@/types';
import {
	CircleArrowDownIcon,
	CircleArrowUpIcon,
	EditIcon,
	TrashIcon,
} from 'lucide-react';
import { useMemo } from 'react';

const COLOR_CLASS_MAP: Record<string, { text: string; background: string }> = {
	green: { text: 'text-green-base', background: 'bg-green-light' },
	blue: { text: 'text-blue-base', background: 'bg-blue-light' },
	purple: { text: 'text-purple-base', background: 'bg-purple-light' },
	pink: { text: 'text-pink-base', background: 'bg-pink-light' },
	red: { text: 'text-red-base', background: 'bg-red-light' },
	orange: { text: 'text-orange-base', background: 'bg-orange-light' },
	yellow: { text: 'text-yellow-base', background: 'bg-yellow-light' },
};

interface TransactionsTableProps {
	transactions: Transaction[];
	currentPage: number;
	pageSize: number;
	onPageChange: (page: number) => void;
	onEdit: (transaction: Transaction) => void;
	onDelete: (transaction: Transaction) => void;
}

export function TransactionsTable({
	transactions,
	currentPage,
	pageSize,
	onPageChange,
	onEdit,
	onDelete,
}: TransactionsTableProps) {
	const totalPages = Math.max(1, Math.ceil(transactions.length / pageSize));
	const startIndex =
		transactions.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
	const endIndex = Math.min(currentPage * pageSize, transactions.length);

	const paginatedTransactions = useMemo(() => {
		const start = (currentPage - 1) * pageSize;
		return transactions.slice(start, start + pageSize);
	}, [transactions, currentPage, pageSize]);

	return (
		<main className="w-full max-w-6xl bg-white rounded-lg shadow border border-gray-200">
			<Table>
				<TableHeader className="[&_tr]:border-gray-200 text-gray-500 uppercase text-xs">
					<TableRow>
						<TableHead className="px-6 py-5">Descrição</TableHead>
						<TableHead className="px-6 py-5 text-center">Data</TableHead>
						<TableHead className="px-6 py-5 text-center">Categoria</TableHead>
						<TableHead className="px-6 py-5 text-center">Tipo</TableHead>
						<TableHead className="px-6 py-5 text-center">Valor</TableHead>
						<TableHead className="px-6 py-5 text-right">Ações</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="[&_tr]:border-gray-200 text-gray-600 text-sx">
					{paginatedTransactions.map((transaction) => {
						const categoryClasses = COLOR_CLASS_MAP[
							transaction.category.color
						] ?? {
							text: 'text-gray-500',
							background: 'bg-gray-100',
						};

						return (
							<TableRow className="[&_tr]:border-gray-200" key={transaction.id}>
								<TableCell className="px-6 py-5">
									{transaction.description}
								</TableCell>
								<TableCell className="px-6 py-5 text-center">
									{new Date(transaction.date).toLocaleDateString('pt-BR', {
										timeZone: 'UTC',
									})}
								</TableCell>
								<TableCell className="px-6 py-5 flex justify-center items-center">
									<div
										className={`${categoryClasses.text} ${categoryClasses.background} rounded-3xl px-5 py-2`}
									>
										{transaction.category.name}
									</div>
								</TableCell>
								<TableCell className="px-6 py-5 text-center">
									{transaction.amount >= 0 ? (
										<div className="flex items-center justify-center gap-1 text-green-base">
											<CircleArrowUpIcon className="w-4 h-4 " /> Entrada
										</div>
									) : (
										<div className="flex items-center justify-center gap-1 text-red-base">
											<CircleArrowDownIcon className="w-4 h-4 " /> Saída
										</div>
									)}
								</TableCell>
								<TableCell className="px-6 py-5 text-center">
									{transaction.amount >= 0 ? '+' : '-'}R${' '}
									{transaction.amount.toFixed(2)}
								</TableCell>
								<TableCell className="px-6 py-5 flex gap-2 justify-end">
									<Button
										className="w-8 h-8 border border-gray-200 bg-white shadow-sm gap-1 text-red-base hover:bg-red-light hover:text-red-dark"
										onClick={() => onDelete(transaction)}
									>
										<TrashIcon />
									</Button>
									<Button
										className="w-8 h-8 border border-gray-200 bg-white shadow-sm gap-1 hover:bg-gray-100 hover:text-gray-700"
										onClick={() => onEdit(transaction)}
									>
										<EditIcon />
									</Button>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
			<div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
				<span className="text-sm text-gray-500">
					{startIndex} a {endIndex} | {transactions.length} resultados
				</span>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						disabled={currentPage === 1}
						onClick={() => onPageChange(1)}
					>
						&laquo;
					</Button>
					<Button
						variant="outline"
						size="sm"
						disabled={currentPage === 1}
						onClick={() => onPageChange(Math.max(1, currentPage - 1))}
					>
						&lsaquo;
					</Button>
					<span className="text-sm text-gray-600">
						{currentPage} / {totalPages}
					</span>
					<Button
						variant="outline"
						size="sm"
						disabled={currentPage === totalPages}
						onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
					>
						&rsaquo;
					</Button>
					<Button
						variant="outline"
						size="sm"
						disabled={currentPage === totalPages}
						onClick={() => onPageChange(totalPages)}
					>
						&raquo;
					</Button>
				</div>
			</div>
		</main>
	);
}
