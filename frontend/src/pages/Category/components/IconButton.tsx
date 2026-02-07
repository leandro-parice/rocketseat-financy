import { Button } from '@/components/ui/button';

interface IconButtonProps {
	icon: React.ReactNode;
	onSelectIcon?: () => void;
	active?: boolean;
}

export function IconButton({ icon, onSelectIcon, active }: IconButtonProps) {
	return (
		<Button
			type="button"
			className={`text-gray-500 border border-gray-500 flex items-center justify-center w-11 h-11 hover:bg-gray-400 ${active ? 'bg-gray-300' : ''}`}
			onClick={onSelectIcon}
		>
			{icon}
		</Button>
	);
}
