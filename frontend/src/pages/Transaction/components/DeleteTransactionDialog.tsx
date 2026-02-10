import {
	Dialog,
	DialogHeader,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogFooter,
	DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import type { Transaction } from '@/types';
import { DELETE_TRANSACTION_MUTATION } from '@/lib/graphql/mutations/Transaction';

interface DeleteTransactionDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	transaction: Transaction;
	onSuccess?: () => void;
}

export function DeleteTransactionDialog({
	open,
	onOpenChange,
	transaction,
	onSuccess,
}: DeleteTransactionDialogProps) {
	const [deleteTransaction, { loading }] = useMutation(
		DELETE_TRANSACTION_MUTATION,
		{
			onCompleted: () => {
				toast.success('Transação removida com sucesso!');
				onOpenChange(false);
			},
			onError: (error) => {
				toast.error('Erro ao remover transação: ' + error.message);
			},
		},
	);

	const handleDelete = () => {
		try {
			deleteTransaction({
				variables: {
					deleteTransactionId: transaction.id,
				},
			});
			if (onSuccess) {
				onSuccess();
			}
			onOpenChange(false);
		} catch (error) {}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="border border-gray-200 bg-white">
				<DialogHeader className="mb-4">
					<DialogTitle className="text-gray-800">
						Remover transação
					</DialogTitle>
					<DialogDescription className="text-gray-600 text-sm">
						Tem certeza que deseja remover a transação "
						{transaction.description ?? 'Sem descrição'}"?
						<br />
						Essa ação não poderá ser desfeita.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="outline" disabled={loading}>
							Cancelar
						</Button>
					</DialogClose>
					<Button
						type="button"
						className="bg-red-base text-white hover:bg-red-dark"
						onClick={handleDelete}
						disabled={loading}
					>
						Remover
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
