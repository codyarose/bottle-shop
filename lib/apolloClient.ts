import { useMemo } from "react"
import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	NormalizedCacheObject,
} from "@apollo/client"

let apolloClient: ApolloClient<NormalizedCacheObject>

const createApolloClient = () => {
	return new ApolloClient({
		ssrMode: typeof window === "undefined",
		link: new HttpLink({
			uri: "http://localhost:3000/graphql",
			fetch: (...args) => fetch(...args),
		}),
		cache: new InMemoryCache(),
	})
}

export const initializeApollo = (initialState = null) => {
	const _apolloClient = apolloClient ?? createApolloClient()

	if (initialState) {
		const existingCache = _apolloClient.extract()
		_apolloClient.cache.restore({ ...existingCache, ...initialState })
	}

	if (typeof window === "undefined") return _apolloClient

	if (!apolloClient) apolloClient = _apolloClient

	return _apolloClient
}

export const useApollo = (initialState: unknown) => {
	const store = useMemo(() => initializeApollo(initialState), [initialState])
	return store
}
