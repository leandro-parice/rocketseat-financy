import { Button } from '@/components/ui/button';
import { LIST_TRANSACTIONS_QUERY } from '@/lib/graphql/queries/Transactions';
import type { Transaction } from '@/types';
import { useQuery } from '@apollo/client/react';
import { useEffect, useMemo, useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { CreateTransactionDialog } from './components/CreateTransactionDialog';
import { DeleteTransactionDialog } from './components/DeleteTransactionDialog';
import { EditTransactionDialog } from './components/EditTransactionDialog';
import { TransactionsTable } from './components/TransactionsTable';
import { TransactionFilters } from './components/TransactionFilters';

export function TransactionsPage() {
	const [createDialogOpen, setCreateDialogOpen] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [selectedTransaction, setSelectedTransaction] =
		useState<Transaction | null>(null);
	const [categoryId, setCategoryId] = useState('all');
	const [type, setType] = useState<'all' | 'negative' | 'positive'>('all');
	const [period, setPeriod] = useState('all');
	const [search, setSearch] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 10;

	const { data, refetch } = useQuery<{
		listTransactionsByUser: Transaction[];
	}>(LIST_TRANSACTIONS_QUERY);

	const transactions = data?.listTransactionsByUser || [];
	const { periodStart, periodEnd } = useMemo(() => {
		if (transactions.length === 0) {
			const now = new Date();
			return { periodStart: now, periodEnd: now };
		}
		const oldest = transactions.reduce<Date>((minDate, transaction) => {
			const currentDate = new Date(transaction.date);
			return currentDate < minDate ? currentDate : minDate;
		}, new Date(transactions[0].date));
		const start = new Date(oldest.getFullYear(), oldest.getMonth(), 1);
		const end = new Date();
		return { periodStart: start, periodEnd: end };
	}, [transactions]);

	const getMonthKey = (date: Date) =>
		`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

	const filteredTransactions = useMemo(() => {
		const normalizedSearch = search.trim().toLowerCase();
		return transactions.filter((transaction) => {
			const matchesCategory =
				categoryId === 'all' || transaction.category?.id === categoryId;
			const matchesType =
				type === 'all' ||
				(type === 'negative' && transaction.amount < 0) ||
				(type === 'positive' && transaction.amount > 0);
			const matchesPeriod =
				period === 'all' || getMonthKey(new Date(transaction.date)) === period;
			if (!normalizedSearch) {
				return matchesCategory && matchesType && matchesPeriod;
			}
			const description = transaction.description?.toLowerCase() ?? '';
			return (
				matchesCategory &&
				matchesType &&
				matchesPeriod &&
				description.includes(normalizedSearch)
			);
		});
	}, [transactions, categoryId, search, type, period]);

	const handleOpenCreateDialog = () => {
		setCreateDialogOpen(true);
	};

	const handleOpenDeleteDialog = (transaction: Transaction) => {
		setSelectedTransaction(transaction);
		setDeleteDialogOpen(true);
	};

	const handleOpenEditDialog = (transaction: Transaction) => {
		setSelectedTransaction(transaction);
		setEditDialogOpen(true);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	useEffect(() => {
		setCurrentPage(1);
	}, [categoryId, search, type, period]);

	return (
		<>
			<section className="flex flex-col gap-6 items-center justify-center w-full ">
				<div className="flex flex-col gap-6 items-start justify-center w-full max-w-6xl">
					<div className="pt-6 flex justify-between items-center w-full mb-6">
						<div className="flex flex-col gap-1">
							<h1 className="text-3xl font-bold text-gray-800">Transações</h1>
							<span className="text-gray-600">
								Gerencie todas as suas transações financeiras
							</span>
						</div>
						<Button
							className="bg-brand-base text-white hover:bg-brand-dark flex items-center"
							onClick={handleOpenCreateDialog}
						>
							<PlusIcon className="w-4 h-4 mr-1" />
							Nova transação
						</Button>
					</div>
				</div>
				<TransactionFilters
					categoryId={categoryId}
					onCategoryChange={setCategoryId}
					search={search}
					onSearchChange={setSearch}
					type={type}
					onTypeChange={setType}
					period={period}
					onPeriodChange={setPeriod}
					periodStart={periodStart}
					periodEnd={periodEnd}
				/>
				<TransactionsTable
					transactions={filteredTransactions}
					currentPage={currentPage}
					pageSize={pageSize}
					onPageChange={handlePageChange}
					onEdit={handleOpenEditDialog}
					onDelete={handleOpenDeleteDialog}
				/>
			</section>

			<CreateTransactionDialog
				open={createDialogOpen}
				onOpenChange={setCreateDialogOpen}
				onSuccess={refetch}
			/>

			{selectedTransaction && (
				<DeleteTransactionDialog
					open={deleteDialogOpen}
					onOpenChange={setDeleteDialogOpen}
					transaction={selectedTransaction}
					onSuccess={refetch}
				/>
			)}

			{selectedTransaction && (
				<EditTransactionDialog
					open={editDialogOpen}
					onOpenChange={setEditDialogOpen}
					transaction={selectedTransaction}
					onSuccess={refetch}
				/>
			)}
		</>
	);
}
