import { Link } from 'react-router';
import logo from '../assets/logo.svg';
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
import { Checkbox } from '@/components/ui/checkbox';
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field';
import { useAuthStore } from '@/stores/auth';
import { useState } from 'react';
import { toast } from 'sonner';
import {
	EyeClosedIcon,
	EyeIcon,
	LockIcon,
	MailIcon,
	UserPlus,
} from 'lucide-react';
import {
	InputGroup,
	InputGroupInput,
	InputGroupAddon,
} from '@/components/ui/input-group';
import { validateEmail } from '@/lib/utils';

export function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [passwordVisible, setPasswordVisible] = useState(false);

	const login = useAuthStore((state) => state.login);

	const handlePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (email.trim() === '' || password.trim() === '') {
			toast.error('Por favor, preencha todos os campos.');
			return;
		}

		if (!validateEmail(email)) {
			toast.error('Por favor, insira um e-mail válido.');
			return;
		}

		setLoading(true);

		try {
			const loginMutate = await login({ email, password });
			if (loginMutate) {
				toast.success('Login realizado com sucesso!');
			}
		} catch (error) {
			console.error('Erro ao fazer login:', error);
			throw error;
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="flex flex-col gap-8 items-center justify-center min-h-[calc(100vh-4rem)]">
			<img src={logo} alt="Financy Logo" />

			<Card className="w-full max-w-md border-gray-200 bg-white shadow-sm">
				<CardHeader>
					<CardTitle className="text-xl text-center">Fazer login</CardTitle>
					<CardDescription className="text-center text-gray-600">
						Entre na sua conta para continuar
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col gap-6">
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
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
									<InputGroupAddon align="inline-start">
										<MailIcon className="text-muted-foreground text-gray-500" />
									</InputGroupAddon>
								</InputGroup>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="password" className="text-gray-600">
									Senha
								</Label>
								<InputGroup className="border-gray-300 py-5">
									<InputGroupInput
										id="password"
										type={passwordVisible ? 'text' : 'password'}
										placeholder="Digite sua senha"
										required
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
									<InputGroupAddon align="inline-start">
										<LockIcon className="text-muted-foreground text-gray-500" />
									</InputGroupAddon>
									<InputGroupAddon align="inline-end">
										<Button
											type="button"
											variant="ghost"
											size="icon"
											onClick={handlePasswordVisibility}
										>
											{passwordVisible ? (
												<EyeIcon className="text-muted-foreground text-gray-500" />
											) : (
												<EyeClosedIcon className="text-muted-foreground text-gray-500" />
											)}
										</Button>
									</InputGroupAddon>
								</InputGroup>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center justify-between">
									<FieldGroup className="mx-auto">
										<Field orientation="horizontal">
											<Checkbox
												id="terms-checkbox-basic"
												name="terms-checkbox-basic"
											/>
											<FieldLabel htmlFor="terms-checkbox-basic">
												Lembrar-me
											</FieldLabel>
										</Field>
									</FieldGroup>
									<a
										href="#"
										className="ml-auto inline-block text-sm underline-offset-4 hover:underline whitespace-nowrap text-brand-base"
									>
										Recuperar senha
									</a>
								</div>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex-col gap-2">
					<Button
						type="submit"
						className="w-full bg-brand-base text-white hover:bg-brand-dark p-5"
						disabled={loading}
						onClick={handleSubmit}
					>
						Entrar
					</Button>
					<div className="flex gap-2 w-full items-center justify-center-safe">
						<div className="h-px bg-gray-300 w-full"></div>
						<div className="text-gray-500 px-2">ou</div>
						<div className="h-px bg-gray-300 w-full"></div>
					</div>
					<div className="text-center text-gray-600">Ainda não tem conta?</div>
					<Button
						variant="outline"
						className="w-full border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-100 p-5"
						asChild
					>
						<Link to="/register">
							<UserPlus className="inline-block" />
							Criar conta
						</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
