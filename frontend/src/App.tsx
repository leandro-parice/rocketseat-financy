import { Navigate, Route, Routes } from 'react-router';
import { LoginPage } from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { Layout } from './components/LayoutPage';
import { useAuthStore } from './stores/auth';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { CategoriesPage } from './pages/Category/CategoriesPage';
import { AuthenticatedPage } from './components/AuthenticatedPage';
import { TransactionsPage } from './pages/Transaction/TransactionsPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { isAuthenticated } = useAuthStore();
	return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
	const { isAuthenticated } = useAuthStore();
	return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
}

function App() {
	return (
		<Layout>
			<Routes>
				<Route
					path="/login"
					element={
						<PublicRoute>
							<LoginPage />
						</PublicRoute>
					}
				/>
				<Route
					path="/register"
					element={
						<PublicRoute>
							<RegisterPage />
						</PublicRoute>
					}
				/>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<AuthenticatedPage>
								<DashboardPage />
							</AuthenticatedPage>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/profile"
					element={
						<ProtectedRoute>
							<AuthenticatedPage>
								<ProfilePage />
							</AuthenticatedPage>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/categories"
					element={
						<ProtectedRoute>
							<AuthenticatedPage>
								<CategoriesPage />
							</AuthenticatedPage>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/transactions"
					element={
						<ProtectedRoute>
							<AuthenticatedPage>
								<TransactionsPage />
							</AuthenticatedPage>
						</ProtectedRoute>
					}
				/>
			</Routes>
		</Layout>
	);
}

export default App;
