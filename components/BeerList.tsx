import { gql, useQuery } from "@apollo/client"
import styled from "@emotion/styled"
import React, { FC } from "react"
import {
	CartActionType,
	useCartDispatch,
	useCartState,
} from "../context/CartContext"
import { Beer } from "../mocks/handlers"

interface Props {
	nameFilter: string
	styleFilter: string
}

export const GET_BEERS = gql`
	query GetBeers($nameFilter: String!, $styleFilter: String!) {
		count
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
const imageFallback =
	"https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png"

const BeerList: FC<Props> = ({ nameFilter, styleFilter }) => {
	const { loading, error, data } = useQuery<{ beers: Beer[]; count: number }>(
		GET_BEERS,
		{
			variables: { nameFilter, styleFilter },
		}
	)
	const { count, beers } = { ...data }
	const dispatch = useCartDispatch()
	const { cart } = useCartState()
	const handleAddToCart = (id: number) => {
		dispatch({ type: CartActionType.addItem, payload: { id } })
	}

	const isInCart = (id: number): boolean => {
		return cart.find((item) => item.id === id)
	}

	return (
		<div>
			{loading && <span>loading...</span>}
			{error && <span>Error: {error.message}</span>}
			{!loading && data && (
				<>
					<span>{count} results</span>
					<List>
						{beers.map((beer: Beer) => {
							const { id, name, image, style, price, abv } = beer
							const displayedImage = image ? image : imageFallback
							return (
								<Item key={id}>
									<ItemImage
										src={displayedImage}
										alt={`${name} label`}
									/>
									<ItemBody>
										<ItemTitle>{name}</ItemTitle>
										<ItemDetails>
											<small>Style: {style}</small>
											<small>ABV: {abv}</small>
										</ItemDetails>
										<ItemPrice>${price}</ItemPrice>
										<button
											onClick={() => handleAddToCart(id)}
											disabled={isInCart(id)}
										>
											{isInCart(id)
												? "added to cart"
												: "add to cart"}
										</button>
									</ItemBody>
								</Item>
							)
						})}
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

const Item = styled.li`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1.5rem 1rem;
	border: 1px solid lightgray;
	border-radius: 3px;
`

const ItemImage = styled.img`
	width: 100px;
	height: 100px;
	object-fit: cover;
	object-position: center;
`

const ItemBody = styled.div`
	display: flex;
	flex-direction: column;
	text-align: center;
	margin: 1rem 0 0;
`

const ItemTitle = styled.h2`
	font-size: 1.25rem;
	margin-bottom: 0.5rem;
`

const ItemDetails = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 0.5rem;
	margin-bottom: 0.5rem;
`

const ItemPrice = styled.span`
	font-size: 1.5rem;
`

export default BeerList
