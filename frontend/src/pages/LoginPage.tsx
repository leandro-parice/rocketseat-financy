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
import { Checkbox } from '@/components/ui/checkbox';
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field';

export function LoginPage() {
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
					<form>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email" className="text-gray-600">
									Email
								</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									className="border-gray-200"
									required
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="password" className="text-gray-600">
									Password
								</Label>
								<Input
									id="password"
									type="password"
									className="border-gray-200"
									required
								/>
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
						<Link to="/register">Criar conta</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
