import { Link, NavLink } from 'react-router';
import logo from '../assets/logo.svg';
import { cn, getInitials } from '../lib/utils';
import { useAuthStore } from '@/stores/auth';

export function Header() {
	const { user } = useAuthStore();
	const initials = getInitials(user?.name || '');
	return (
		<header className="bg-white w-full flex justify-between items-center px-12 py-4 shadow-sm border-b border-gray-200 mb-12">
			<img src={logo} alt="Financy Logo" />
			<nav>
				<ul className="flex justify-center gap-5 text-sm text-gray-600">
					<li>
						<NavLink
							to="/"
							end
							className={({ isActive }) =>
								cn('hover:text-brand-base', isActive && 'text-brand-base')
							}
						>
							Dashboard
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/transactions"
							className={({ isActive }) =>
								cn('hover:text-brand-base', isActive && 'text-brand-base')
							}
						>
							Transações
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/categories"
							className={({ isActive }) =>
								cn('hover:text-brand-base', isActive && 'text-brand-base')
							}
						>
							Categorias
						</NavLink>
					</li>
				</ul>
			</nav>
			<Link
				to="/profile"
				className="hover:text-brand-base bg-gray-300 text-gray-800 text-sm uppercase flex justify-center items-center rounded-full w-9 h-9"
			>
				{initials}
			</Link>
		</header>
	);
}
