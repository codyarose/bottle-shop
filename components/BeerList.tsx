import React, { FC } from "react"
import { gql, useQuery } from "@apollo/client"
import styled from "@emotion/styled"
import { Beer } from "../mocks/handlers"
import BeerInfo from "./BeerInfo"

interface Props {
	nameFilter: string
	styleFilter: string
}

export const GET_BEERS = gql`
	query GetBeers($nameFilter: String!, $styleFilter: String!) {
		beers(nameFilter: $nameFilter, styleFilter: $styleFilter) {
			id
			name
			image
			style
			price
			abv
		}
	}
`

const BeerList: FC<Props> = ({ nameFilter, styleFilter }) => {
	const { loading, error, data } = useQuery<{ beers: Beer[] }>(GET_BEERS, {
		variables: { nameFilter, styleFilter },
	})
	const { beers } = data ?? {}

	return (
		<div style={{ marginTop: "3rem" }}>
			{loading && <span>loading...</span>}
			{error && <span>Error: {error.message}</span>}
			{!loading && data && (
				<>
					<List>
						{beers.map((beer: Beer) => (
							<li key={beer.id}>
								<BeerInfo beer={beer} layout='card' />
							</li>
						))}
					</List>
				</>
			)}
		</div>
	)
}

const List = styled.ul`
	list-style-type: none;
	padding: 0;
	margin: 1rem 0;

	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 2rem;
`

export default BeerList
