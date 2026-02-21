import { Link } from 'react-router';
import logo from '../../assets/logo.svg';
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
import { useState } from 'react';
import { useAuthStore } from '@/stores/auth';
import { toast } from 'sonner';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from '@/components/ui/input-group';
import {
	EyeClosedIcon,
	EyeIcon,
	LockIcon,
	LogInIcon,
	MailIcon,
	UserIcon,
} from 'lucide-react';
import { validateEmail } from '@/lib/utils';

export function RegisterPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [passwordVisible, setPasswordVisible] = useState(false);

	const signup = useAuthStore((state) => state.signup);

	const handlePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
			toast.error('Por favor, preencha todos os campos.');
			return;
		}

		if (!validateEmail(email)) {
			toast.error('Por favor, insira um e-mail válido.');
			return;
		}

		if (password.length < 8) {
			toast.error('A senha deve ter no mínimo 8 caracteres.');
			return;
		}

		setLoading(true);

		try {
			const signupMutate = await signup({ name, email, password });
			if (signupMutate) {
				toast.success('Cadastro realizado com sucesso!');
			}
		} catch (error) {
			console.error('Erro ao cadastrar:', error);
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
					<CardTitle className="text-xl text-center">Criar conta</CardTitle>
					<CardDescription className="text-center text-gray-600">
						Comece a controlar suas finanças ainda hoje
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="fullName" className="text-gray-600">
									Nome completo
								</Label>
								<InputGroup className="border-gray-300 py-5 has-[[data-slot=input-group-control]:focus-visible]:ring-0 has-[[data-slot=input-group-control]:focus-visible]:border-gray-300">
									<InputGroupInput
										id="fullName"
										type="text"
										placeholder="Seu nome completo"
										className="border-gray-200  px-4 py-5"
										required
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
									<InputGroupAddon align="inline-start">
										<UserIcon className="text-muted-foreground text-gray-500" />
									</InputGroupAddon>
								</InputGroup>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="email" className="text-gray-600">
									E-mail
								</Label>
								<InputGroup className="border-gray-300 py-5 has-[[data-slot=input-group-control]:focus-visible]:ring-0 has-[[data-slot=input-group-control]:focus-visible]:border-gray-300">
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
							<div className="grid gap-2  mb-2">
								<Label htmlFor="password" className="text-gray-600">
									Senha
								</Label>
								<InputGroup className="border-gray-300 py-5 has-[[data-slot=input-group-control]:focus-visible]:ring-0 has-[[data-slot=input-group-control]:focus-visible]:border-gray-300">
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
								<span className="text-gray-500 text-xs">
									A senha deve ter no mínimo 8 caracteres
								</span>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex-col gap-2 pt-4">
						<Button
							type="submit"
							className="w-full bg-brand-base text-white hover:bg-brand-dark p-5"
							disabled={loading}
						>
							Cadastrar
						</Button>
						<div className="flex gap-2 w-full items-center justify-center-safe my-4">
							<div className="h-px bg-gray-300 w-full"></div>
							<div className="text-gray-500 px-2">ou</div>
							<div className="h-px bg-gray-300 w-full"></div>
						</div>
						<div className="text-center text-gray-600 mb-2">
							Já tem uma conta?
						</div>
						<Button
							variant="outline"
							className="w-full border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-100 p-5"
							asChild
						>
							<Link to="/login">
								<LogInIcon className="inline-block" />
								Fazer login
							</Link>
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
