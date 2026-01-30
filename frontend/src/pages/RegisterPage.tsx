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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useAuthStore } from '@/stores/auth';
import { toast } from 'sonner';

export function RegisterPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const signup = useAuthStore((state) => state.signup);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

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
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email" className="text-gray-600">
									Nome completo
								</Label>
								<Input
									id="fullName"
									type="text"
									placeholder="Seu nome completo"
									className="border-gray-200"
									required
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="email" className="text-gray-600">
									E-mail
								</Label>
								<Input
									id="email"
									type="email"
									placeholder="mail@example.com"
									className="border-gray-200"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="password" className="text-gray-600">
									Senha
								</Label>
								<Input
									id="password"
									type="password"
									className="border-gray-200"
									placeholder="Digite sua senha"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<span className="text-gray-500 text-xs">
									A senha deve ter no mínimo 8 caracteres
								</span>
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
						Cadastrar
					</Button>
					<div className="flex gap-2 w-full items-center justify-center-safe">
						<div className="h-px bg-gray-300 w-full"></div>
						<div className="text-gray-500 px-2">ou</div>
						<div className="h-px bg-gray-300 w-full"></div>
					</div>
					<div className="text-center text-gray-600">Já tem uma conta?</div>
					<Button
						variant="outline"
						className="w-full border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-100 p-5"
						asChild
					>
						<Link to="/login">Fazer login</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
