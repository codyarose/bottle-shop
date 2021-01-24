import React from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Head from "next/head"
import { gql, useQuery } from "@apollo/client"

import { Beer } from "../mocks/handlers"

export const GET_ONE_BEER = gql`
	query GetOneBeer($id: Int!) {
		beer(id: $id) {
			name
			image
			style
			price
			abv
		}
	}
`

const Page = () => {
	const {
		query: { id },
	} = useRouter()
	const { loading, data, error } = useQuery<{ beer: Beer }>(GET_ONE_BEER, {
		variables: { id: Number(id) },
	})
	const { beer } = data ?? {}

	return (
		<div>
			<Head>
				<title>{beer?.name} | Bottle Shop</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{loading && <p>Loading...</p>}
			{error && (
				<div>
					<p>{error.message}</p>
					<Link href='/'>
						<a>Go back home</a>
					</Link>
				</div>
			)}
			{!loading && data && (
				<div>
					<p>
						post id: {id} {beer.name}
					</p>
				</div>
			)}
		</div>
	)
}

export default Page
