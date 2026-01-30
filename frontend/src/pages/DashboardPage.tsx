import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth';
import { Link, useNavigate } from 'react-router';
import logo from '../assets/logo.svg';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@radix-ui/react-checkbox';
import { Label } from '@radix-ui/react-label';

export function DashboardPage() {
	const { user, logout, isAuthenticated } = useAuthStore();
	const navigate = useNavigate();
	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<>
			<header>
				<img src={logo} alt="Financy Logo" />
				<nav>
					<ul>
						<li>Dashboard</li>
						<li>Transações</li>
						<li>Categorias</li>
					</ul>
				</nav>
				<div>CT</div>
			</header>
			<section>
				<div className="flex gap-6">
					<Card className="w-full  border-gray-200 bg-white shadow-sm">
						<CardHeader>
							<CardTitle className="text-xl text-center">Fazer login</CardTitle>
							<CardDescription className="text-center text-gray-600">
								Entre na sua conta para continuar
							</CardDescription>
						</CardHeader>
						<CardContent></CardContent>
						<CardFooter className="flex-col gap-2">Footer</CardFooter>
					</Card>
					<Card className="w-full  border-gray-200 bg-white shadow-sm">
						<CardHeader>
							<CardTitle className="text-xl text-center">Fazer login</CardTitle>
							<CardDescription className="text-center text-gray-600">
								Entre na sua conta para continuar
							</CardDescription>
						</CardHeader>
						<CardContent></CardContent>
						<CardFooter className="flex-col gap-2">Footer</CardFooter>
					</Card>
					<Card className="w-full  border-gray-200 bg-white shadow-sm">
						<CardHeader>
							<CardTitle className="text-xl text-center">Fazer login</CardTitle>
							<CardDescription className="text-center text-gray-600">
								Entre na sua conta para continuar
							</CardDescription>
						</CardHeader>
						<CardContent></CardContent>
						<CardFooter className="flex-col gap-2">Footer</CardFooter>
					</Card>
				</div>
			</section>
		</>
	);
}
