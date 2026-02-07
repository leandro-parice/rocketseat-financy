import { Header } from './Header';

interface AuthenticatedPageProps {
	children: React.ReactNode;
}

export function AuthenticatedPage({ children }: AuthenticatedPageProps) {
	return (
		<>
			<Header />
			{children}
		</>
	);
}
