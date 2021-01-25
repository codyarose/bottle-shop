import React, { useState } from "react"
import { initializeApollo } from "../lib/apolloClient"
import Head from "next/head"

import BeerList from "../components/BeerList"
import styled from "@emotion/styled"
import { buttonStyles } from "../components/BeerInfo"

const Home = () => {
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

			<Form
				onSubmit={(e) => {
					e.preventDefault()
					setSearchTerm(input.value)
					setStyleFilter(select.value)
				}}
			>
				<input
					ref={(node) => {
						input = node
					}}
					type='text'
					name='search'
					id='search'
					placeholder='Search'
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
				<Submit>submit</Submit>
			</Form>
			<BeerList nameFilter={searchTerm} styleFilter={styleFilter} />
		</>
	)
}

const Form = styled.form`
	display: grid;
	grid-template-columns: repeat(3, min-content);
	gap: 0.5rem;
	margin-bottom: 1rem;
	& > * {
		padding: 0.5rem;
	}
`

const Submit = styled.button`
	${buttonStyles}
`

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
