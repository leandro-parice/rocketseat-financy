import {
	BaggageClaimIcon,
	BookOpenIcon,
	BriefcaseBusinessIcon,
	CarFrontIcon,
	DumbbellIcon,
	GiftIcon,
	HeartPulseIcon,
	HouseIcon,
	MailboxIcon,
	PawPrintIcon,
	PiggyBankIcon,
	ReceiptTextIcon,
	ShoppingCartIcon,
	TicketIcon,
	ToolCaseIcon,
	UtensilsIcon,
	type LucideIcon,
} from 'lucide-react';

export interface User {
	id: string;
	name: string;
	email: string;
	createdAt: string;
	updatedAt: string;
}

export interface RegisterInput {
	name: string;
	email: string;
	password: string;
}

export interface LoginInput {
	email: string;
	password: string;
}

export interface ProfileInput {
	id: string;
	name: string;
}

export interface Category {
	id: string;
	name: string;
	description?: string;
	color: string;
	icon: string;
	transactionsCount: number;
	createdAt: string;
	updatedAt: string;
}

export type IconOption = {
	value: string;
	Icon: LucideIcon;
};

export const ICON_OPTIONS: IconOption[] = [
	{ value: 'briefcase', Icon: BriefcaseBusinessIcon },
	{ value: 'car', Icon: CarFrontIcon },
	{ value: 'heartPulse', Icon: HeartPulseIcon },
	{ value: 'piggyBank', Icon: PiggyBankIcon },
	{ value: 'shoppingCart', Icon: ShoppingCartIcon },
	{ value: 'ticket', Icon: TicketIcon },
	{ value: 'toolCase', Icon: ToolCaseIcon },
	{ value: 'utensils', Icon: UtensilsIcon },
	{ value: 'pawPrint', Icon: PawPrintIcon },
	{ value: 'house', Icon: HouseIcon },
	{ value: 'gift', Icon: GiftIcon },
	{ value: 'dumbbell', Icon: DumbbellIcon },
	{ value: 'bookOpen', Icon: BookOpenIcon },
	{ value: 'baggageClaim', Icon: BaggageClaimIcon },
	{ value: 'mailbox', Icon: MailboxIcon },
	{ value: 'receiptText', Icon: ReceiptTextIcon },
];
