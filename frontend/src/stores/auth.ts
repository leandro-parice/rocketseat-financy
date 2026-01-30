import { apolloClient } from '@/lib/apollo';
import { LOGIN_MUTATION } from '@/lib/graphql/mutations/Login';
import { REGISTER_MUTATION } from '@/lib/graphql/mutations/Register';
import type { User, RegisterInput, LoginInput } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
	user: User | null;
	token: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;
	signup: (data: RegisterInput) => Promise<boolean>;
	login: (data: LoginInput) => Promise<boolean>;
	logout: () => void;
}

type RegisterMutationData = {
	register: {
		token: string;
		refreshToken: string;
		user: User;
	};
};

type LoginMutationData = {
	login: {
		token: string;
		refreshToken: string;
		user: User;
	};
};

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			token: null,
			refreshToken: null,
			isAuthenticated: false,
			signup: async (registerData: RegisterInput) => {
				try {
					const { data } = await apolloClient.mutate<
						RegisterMutationData,
						{ data: RegisterInput }
					>({
						mutation: REGISTER_MUTATION,
						variables: {
							data: {
								name: registerData.name,
								email: registerData.email,
								password: registerData.password,
							},
						},
					});
					if (data?.register) {
						const { token, refreshToken, user } = data.register;
						set({
							user,
							token,
							refreshToken,
							isAuthenticated: true,
						});
						return true;
					}
					return false;
				} catch (error) {
					console.log('Erro ao fazer o cadastro');
					throw error;
				} finally {
					console.log('Cadastro finalizado');
				}
			},
			login: async (loginData: LoginInput) => {
				try {
					const { data } = await apolloClient.mutate<
						LoginMutationData,
						{ data: LoginInput }
					>({
						mutation: LOGIN_MUTATION,
						variables: {
							data: {
								email: loginData.email,
								password: loginData.password,
							},
						},
					});
					if (data?.login) {
						const { token, refreshToken, user } = data.login;
						set({
							user,
							token,
							refreshToken,
							isAuthenticated: true,
						});
						return true;
					}
					return false;
				} catch (error) {
					console.log('Erro ao fazer o login');
					throw error;
				} finally {
					console.log('Login finalizado');
				}
			},
			logout: () => {
				set({
					user: null,
					token: null,
					refreshToken: null,
					isAuthenticated: false,
				});
				apolloClient.clearStore();
			},
		}),
		{
			name: 'auth-storage',
		},
	),
);
