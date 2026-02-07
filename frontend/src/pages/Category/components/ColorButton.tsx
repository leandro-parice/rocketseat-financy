import { Button } from '@/components/ui/button';

interface ColorButtonProps {
	value: string;
	borderClass: string;
	bgClass: string;
	color: string;
	handleColorSelect: (color: string) => void;
}

export function ColorButton({
	value,
	borderClass,
	bgClass,
	color,
	handleColorSelect,
}: ColorButtonProps) {
	return (
		<Button
			type="button"
			className={`w-full px-1 py-4 border border-gray-200 rounded-md ${
				color === value ? borderClass : ''
			}`}
			onClick={() => handleColorSelect(value)}
		>
			<div className={`h-6 w-full ${bgClass} rounded-md`} />
		</Button>
	);
}
