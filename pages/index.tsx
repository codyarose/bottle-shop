import React, { useEffect, useState } from "react"
import { initializeApollo } from "../lib/apolloClient"
import Head from "next/head"
import styled from "@emotion/styled"

import BeerList from "../components/BeerList"
import Cart from "../components/Cart"
import { CartActionType, useCartDispatch } from "../context/CartContext"

const Home = () => {
	// const [login] = useMutation(LOGIN, { refetchQueries: ["GetUserInfo"] })
	const [searchTerm, setSearchTerm] = useState("")
	const [styleFilter, setStyleFilter] = useState("all")
	const dispatch = useCartDispatch()

	useEffect(() => {
		dispatch({ type: CartActionType.hydrateCart })
	}, [])

	let input: HTMLInputElement
	let select: HTMLSelectElement
	return (
		<div>
			<Head>
				<title>Bottle Shop</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Main>
				<Header>
					<h1>Bottle Shop</h1>
				</Header>
				<form
					onSubmit={(e) => {
						e.preventDefault()
						setSearchTerm(input.value)
						setStyleFilter(select.value)
					}}
				>
					<label htmlFor='search'>Search:</label>
					<input
						ref={(node) => {
							input = node
						}}
						type='text'
						name='search'
						id='search'
					/>
					<select
						name='style'
						id='style'
						defaultValue='all'
						ref={(node) => {
							select = node
						}}
					>
						<option value='all'>All</option>
						<option value='IPA'>IPA</option>
						<option value='Stout'>Stout</option>
					</select>
					<button type='submit'>submit</button>
				</form>
				<BeerList nameFilter={searchTerm} styleFilter={styleFilter} />
			</Main>
			<Cart />
			<footer>
				<a
					href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
					target='_blank'
					rel='noopener noreferrer'
				>
					Powered by Vercel
				</a>
			</footer>
		</div>
	)
}

// const LOGIN = gql`
// 	mutation Login($username: String!) {
// 		login(username: $username) {
// 			username
// 		}
// 	}
// `

export async function getStaticProps() {
	const apolloClient = initializeApollo()

	return {
		props: {
			initialApolloState: apolloClient.cache.extract(),
		},
		revalidate: 1,
	}
}

const Main = styled.main`
	width: 100%;
	max-width: 1024px;
	padding: 0 2rem;
	margin: 0 auto;
`
const Header = styled.header`
	padding: 2rem 0;
	h1 {
		margin-bottom: 0;
	}
`

export default Home
