import { Navigate, Route, Routes } from 'react-router';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { Layout } from './components/LayoutPage';
import { useAuthStore } from './stores/auth';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { ProfilePage } from './pages/Profile/ProfilePage';

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
							<DashboardPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/profile"
					element={
						<ProtectedRoute>
							<ProfilePage />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</Layout>
	);
}

export default App;
