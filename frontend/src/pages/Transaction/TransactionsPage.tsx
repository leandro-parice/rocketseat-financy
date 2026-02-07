import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { LIST_TRANSACTIONS_QUERY } from '@/lib/graphql/queries/Transactions';
import type { Transaction } from '@/types';
import { useQuery } from '@apollo/client/react';
import {
	CircleArrowDownIcon,
	CircleArrowUpIcon,
	EditIcon,
	PlusIcon,
	TrashIcon,
} from 'lucide-react';

const COLOR_CLASS_MAP: Record<
	string,
	{ text: string; background: string }
> = {
	green: { text: 'text-green-base', background: 'bg-green-light' },
	blue: { text: 'text-blue-base', background: 'bg-blue-light' },
	purple: { text: 'text-purple-base', background: 'bg-purple-light' },
	pink: { text: 'text-pink-base', background: 'bg-pink-light' },
	red: { text: 'text-red-base', background: 'bg-red-light' },
	orange: { text: 'text-orange-base', background: 'bg-orange-light' },
	yellow: { text: 'text-yellow-base', background: 'bg-yellow-light' },
};

export function TransactionsPage() {
	const { data, refetch } = useQuery<{
		listTransactionsByUser: Transaction[];
	}>(LIST_TRANSACTIONS_QUERY);

	const transactions = data?.listTransactionsByUser || [];

	console.log(transactions);

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
						<Button className="bg-brand-base text-white hover:bg-brand-dark flex items-center">
							<PlusIcon className="w-4 h-4 mr-1" />
							Nova transação
						</Button>
					</div>
				</div>
				<main className="w-full max-w-6xl bg-white rounded-lg shadow border border-gray-200">
					<Table>
						<TableHeader className="[&_tr]:border-gray-200 text-gray-500 uppercase text-xs">
							<TableRow>
								<TableHead className="px-6 py-5">Descrição</TableHead>
								<TableHead className="px-6 py-5 text-center">Data</TableHead>
								<TableHead className="px-6 py-5 text-center">
									Categoria
								</TableHead>
								<TableHead className="px-6 py-5 text-center">Tipo</TableHead>
								<TableHead className="px-6 py-5 text-center">Valor</TableHead>
								<TableHead className="px-6 py-5 text-right">Ações</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className="[&_tr]:border-gray-200 text-gray-600 text-sx">
							{transactions.map((transaction) => {
								const categoryClasses =
									COLOR_CLASS_MAP[transaction.category.color] ?? {
										text: 'text-gray-500',
										background: 'bg-gray-100',
									};

								return (
								<TableRow
									className="[&_tr]:border-gray-200"
									key={transaction.id}
								>
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
										<Button className="w-8 h-8 border border-gray-200 bg-white shadow-sm gap-1 text-red-base hover:bg-red-light hover:text-red-dark">
											<TrashIcon />
										</Button>
										<Button className="w-8 h-8 border border-gray-200 bg-white shadow-sm gap-1 hover:bg-gray-100 hover:text-gray-700">
											<EditIcon />
										</Button>
									</TableCell>
								</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</main>
			</section>
		</>
	);
}
