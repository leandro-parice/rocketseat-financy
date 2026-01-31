import { useNavigate } from 'react-router';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { useEffect, useRef, useState } from 'react';
import { Header } from '@/components/Header';
import { useAuthStore } from '@/stores/auth';
import { LogOutIcon, MailIcon, UserIcon } from 'lucide-react';
import { apolloClient } from '@/lib/apollo';
import { PROFILE_MUTATION } from '@/lib/graphql/mutations/Profile';
import type { ProfileInput, User } from '@/types';
import {
	InputGroup,
	InputGroupInput,
	InputGroupAddon,
} from '@/components/ui/input-group';
import { getInitials } from '@/lib/utils';

export function ProfilePage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [isDirty, setIsDirty] = useState(false);
	const lastUserIdRef = useRef<string | null>(null);

	const { user, logout } = useAuthStore();

	useEffect(() => {
		if (!user) {
			return;
		}

		const userId = user.id ?? null;
		const hasUserChanged = userId && userId !== lastUserIdRef.current;

		if (hasUserChanged) {
			lastUserIdRef.current = userId;
			setName(user.name ?? '');
			setEmail(user.email ?? '');
			setIsDirty(false);
			return;
		}

		setEmail(user.email ?? '');

		if (!isDirty) {
			setName(user.name ?? '');
		}
	}, [isDirty, user]);

	const initials = getInitials(name || user?.name || '');

	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!user) {
			return;
		}

		setLoading(true);

		try {
			const updateData: ProfileInput = {
				id: user.id,
				name,
			};

			console.log(updateData);

			const { data } = await apolloClient.mutate<
				{ editUser: User },
				{ data: ProfileInput }
			>({
				mutation: PROFILE_MUTATION,
				variables: {
					data: updateData,
				},
			});

			if (data?.editUser) {
				useAuthStore.setState((state) => ({
					user: state.user
						? { ...state.user, ...data.editUser }
						: data.editUser,
				}));
				setName(data.editUser.name ?? name);
				setIsDirty(false);
			}
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			<Header />
			<div className="flex flex-col gap-8 items-center justify-center">
				<Card className="w-full max-w-md border-gray-200 bg-white shadow-sm">
					<form onSubmit={handleSubmit}>
						<CardHeader>
							<div className="hover:text-brand-base bg-gray-300 text-gray-800 text-2xl uppercase flex justify-center items-center rounded-full w-16 h-16 mx-auto mb-4">
								{initials}
							</div>
							<CardTitle className="text-xl text-center">
								{name || user?.name || 'Nome da conta'}
							</CardTitle>
							<CardDescription className="text-center text-gray-600">
								{user?.email ?? 'Sem e-mail'}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-px bg-gray-200 w-full mb-8 mt-6"></div>
							<div className="flex flex-col gap-6 pb-6">
								<div className="grid gap-2">
									<Label htmlFor="name" className="text-gray-600">
										Nome completo
									</Label>
									<InputGroup className="border-gray-300 py-5">
										<InputGroupInput
											id="fullName"
											type="text"
											placeholder="Seu nome completo"
											className="border-gray-200  px-4 py-5"
											required
											value={name}
											onChange={(e) => {
												setName(e.target.value);
												setIsDirty(true);
											}}
										/>
										<InputGroupAddon align="inline-start">
											<UserIcon className="text-muted-foreground text-gray-500" />
										</InputGroupAddon>
									</InputGroup>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="email" className="text-gray-600">
										Email
									</Label>
									<InputGroup className="border-gray-300 py-5">
										<InputGroupInput
											id="email"
											type="email"
											placeholder="mail@example.com"
											className="border-gray-200  px-4 py-5"
											disabled
											value={email}
										/>
										<InputGroupAddon align="inline-start">
											<MailIcon className="text-muted-foreground text-gray-500" />
										</InputGroupAddon>
									</InputGroup>
									<span className="text-xs text-gray-500">
										O e-mail não pode ser alterado
									</span>
								</div>
							</div>
						</CardContent>
						<CardFooter className="flex-col gap-4">
							<Button
								type="submit"
								className="w-full bg-brand-base text-white hover:bg-brand-dark p-5"
								disabled={loading || !isDirty}
							>
								Salvar alterações
							</Button>
							<Button
								type="button"
								className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 p-5"
								onClick={handleLogout}
							>
								<LogOutIcon size={14} className="text-red-base" />
								Sair da conta
							</Button>
						</CardFooter>
					</form>
				</Card>
			</div>
		</>
	);
}
