import { ApolloProvider } from "@apollo/client"
import {AppProps} from 'next/app'
import Link from "next/link"
import styled from "@emotion/styled"
import { useApollo } from "../lib/apolloClient"
import { CartProvider } from "../context/CartContext"
import Cart from "../components/Cart"
import { content } from "../styles/utils"
import "../styles/globals.css"
require("../mocks")

const App = ({ Component, pageProps }: AppProps) => {
	const apolloClient = useApollo(pageProps.initialApolloState)

	return (
		<ApolloProvider client={apolloClient}>
			<CartProvider>
				<AppWrapper>
					<AppBody>
						<Header>
							<Link href='/'>
								<a>
									<h1>Bottle Shop</h1>
								</a>
							</Link>
						</Header>
						<Main>
							<Component {...pageProps} />
						</Main>
						<Footer>
							<a
								href='https://github.com/codyarose/bottle-shop'
								target='_blank'
							>
								Github
							</a>
						</Footer>
					</AppBody>
					<Cart />
				</AppWrapper>
			</CartProvider>
		</ApolloProvider>
	)
}

const AppWrapper = styled.div`
	position: relative;
	min-height: 100vh;
	display: grid;
	grid-template-columns: 1fr 300px;
`

const AppBody = styled.div`
	display: grid;
	grid-template-rows: auto 1fr auto;
	grid-column: 1 / -1;
	grid-row: 1 / -1;
`

const Main = styled.main`
	${content}
`

const Header = styled.header`
	${content}
	padding: 2rem;
	h1 {
		margin-bottom: 0;
	}
`

const Footer = styled.footer`
	${content}
	padding: 2rem;
	text-align: center;
	font-size: 1.5rem;
	a {
		text-decoration: underline;
	}
`
export default App
