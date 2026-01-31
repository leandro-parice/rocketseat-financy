import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function validateEmail(email: string) {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(String(email).toLowerCase());
}

export function getInitials(name: string) {
	const fallback = 'AA';
	const baseName = name;

	const trimmed = baseName.trim();
	if (!trimmed) {
		return fallback;
	}

	const parts = trimmed.split(/\s+/);
	const first = parts[0]?.[0] ?? '';
	const last =
		parts.length > 1
			? (parts[parts.length - 1]?.[0] ?? '')
			: (parts[0]?.[1] ?? '');
	return `${first}${last}`.toUpperCase() || fallback;
}
