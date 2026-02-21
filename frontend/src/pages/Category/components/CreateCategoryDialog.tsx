import {
	Dialog,
	DialogHeader,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRef, useState } from 'react';

import { IconButton } from './IconButton';
import { Button } from '@/components/ui/button';
import { useMutation } from '@apollo/client/react';
import { CREATE_CATEGORY_MUTATION } from '@/lib/graphql/mutations/Category';
import { toast } from 'sonner';
import { ColorButton } from './ColorButton';
import { ICON_OPTIONS } from '@/types';

interface CreateCategoryDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSuccess?: () => void;
}

type ColorOption = {
	value: string;
	borderClass: string;
	bgClass: string;
};

const COLOR_OPTIONS: ColorOption[] = [
	{ value: 'green', borderClass: 'border-green-500', bgClass: 'bg-green-base' },
	{ value: 'blue', borderClass: 'border-blue-500', bgClass: 'bg-blue-base' },
	{
		value: 'purple',
		borderClass: 'border-purple-500',
		bgClass: 'bg-purple-base',
	},
	{ value: 'pink', borderClass: 'border-pink-500', bgClass: 'bg-pink-base' },
	{ value: 'red', borderClass: 'border-red-500', bgClass: 'bg-red-base' },
	{
		value: 'orange',
		borderClass: 'border-orange-500',
		bgClass: 'bg-orange-base',
	},
	{
		value: 'yellow',
		borderClass: 'border-yellow-500',
		bgClass: 'bg-yellow-base',
	},
];

export function CreateCategoryDialog({
	open,
	onOpenChange,
	onSuccess,
}: CreateCategoryDialogProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [icon, setIcon] = useState('');
	const [color, setColor] = useState('');

	const clearForm = () => {
		setName('');
		setDescription('');
		setIcon('');
		setColor('');
	};

	const [createCategory, { loading }] = useMutation(CREATE_CATEGORY_MUTATION, {
		onCompleted: () => {
			clearForm();
			toast.success('Categoria criada com sucesso!');
			onOpenChange(false);
		},
		onError: (error) => {
			clearForm();
			toast.error('Erro ao criar categoria: ' + error.message);
		},
	});

	const canSubmit =
		name.trim() !== '' && icon !== '' && color !== '' && !loading;

	const handleIconSelect = (selectedIcon: string) => {
		setIcon(selectedIcon);
	};

	const handleColorSelect = (selectedColor: string) => {
		setColor(selectedColor);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		try {
			createCategory({
				variables: {
					data: {
						name,
						description,
						icon,
						color,
					},
				},
			});
			if (onSuccess) {
				onSuccess();
			}
			onOpenChange(false);
		} catch (error) {}
	};

	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== 'Enter') return;
		e.preventDefault();
		if (!canSubmit) return;
		formRef.current?.requestSubmit();
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="border border-gray-200 bg-white">
				<DialogHeader className="mb-6">
					<div className="flex flex-col gap-0.5">
						<DialogTitle className="text-gray-800">Nova categoria</DialogTitle>
						<DialogDescription className="text-gray-600 text-sm">
							Organize suas transações com categorias
						</DialogDescription>
					</div>
				</DialogHeader>
				<form
					ref={formRef}
					onSubmit={handleSubmit}
					className="flex flex-col gap-6"
				>
					<div className="grid gap-2">
						<Label htmlFor="name" className="text-gray-600">
							Título
						</Label>
						<Input
							id="name"
							type="text"
							placeholder="Ex. Alimentação"
							className="border-gray-200  px-4 py-6"
							value={name}
							onChange={(e) => setName(e.target.value)}
							onKeyDown={handleInputKeyDown}
							required
							disabled={loading}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="description" className="text-gray-600">
							Descrição
						</Label>
						<Input
							id="description"
							type="text"
							placeholder="Descrição da categoria"
							className="border-gray-200  px-4 py-6"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							onKeyDown={handleInputKeyDown}
							disabled={loading}
						/>
						<span className="text-xs text-gray-500">Opcional</span>
					</div>
					<div className="grid gap-2">
						<Label className="text-gray-600">Ícone</Label>
						<div
							className={`flex flex-wrap gap-3 justify-between ${loading ? 'pointer-events-none opacity-50' : ''}`}
						>
							{ICON_OPTIONS.map(({ value, Icon }) => (
								<IconButton
									key={value}
									icon={<Icon className="w-7 h-7" />}
									onSelectIcon={() => handleIconSelect(value)}
									active={icon === value}
								/>
							))}
						</div>
					</div>
					<div className="grid gap-2">
						<Label className="text-gray-600">Cor</Label>
						<div
							className={`grid grid-cols-7 gap-3 ${loading ? 'pointer-events-none opacity-50' : ''}`}
						>
							{COLOR_OPTIONS.map(({ value, borderClass, bgClass }) => (
								<ColorButton
									key={value}
									value={value}
									borderClass={borderClass}
									bgClass={bgClass}
									color={color}
									handleColorSelect={handleColorSelect}
								/>
							))}
						</div>
					</div>
					<div className="grid gap-2 mt-4">
						<Button
							type="submit"
							className="w-full bg-brand-base text-white hover:bg-brand-dark p-6"
							disabled={!canSubmit}
						>
							Salvar
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
