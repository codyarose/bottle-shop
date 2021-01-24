import React, { useState } from "react"
import { initializeApollo } from "../lib/apolloClient"
import Head from "next/head"

import BeerList from "../components/BeerList"

const Home = () => {
	// const [login] = useMutation(LOGIN, { refetchQueries: ["GetUserInfo"] })
	const [searchTerm, setSearchTerm] = useState("")
	const [styleFilter, setStyleFilter] = useState("all")

	let input: HTMLInputElement
	let select: HTMLSelectElement
	return (
		<>
			<Head>
				<title>Bottle Shop</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

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
		</>
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

export default Home
