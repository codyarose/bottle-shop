import { ApolloProvider } from "@apollo/client"
import { CartProvider } from "../context/CartContext"
import { useApollo } from "../lib/apolloClient"
import "../styles/globals.css"
require("../mocks")

const App = ({ Component, pageProps }) => {
	const apolloClient = useApollo(pageProps.initialApolloState)

	return (
		<ApolloProvider client={apolloClient}>
			<CartProvider>
				<Component {...pageProps} />
			</CartProvider>
		</ApolloProvider>
	)
}

export default App
