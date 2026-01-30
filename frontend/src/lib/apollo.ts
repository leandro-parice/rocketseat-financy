import { HttpLink } from '@apollo/client/link/http';
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { useAuthStore } from '@/stores/auth';

const httpLink = new HttpLink({
	uri: import.meta.env.VITE_GRAPHQL_HTTP_URL,
});

export const authLink = new SetContextLink((preveContext) => {
	const token = useAuthStore.getState().token;
	return {
		headers: {
			...preveContext.headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

export const apolloClient = new ApolloClient({
	link: ApolloLink.from([authLink, httpLink]),
	cache: new InMemoryCache(),
});
