import React, { useEffect } from "react"
import styled from "@emotion/styled"
import {
	CartActionType,
	useCartDispatch,
	useCartState,
} from "../context/CartContext"
import { gql, useQuery } from "@apollo/client"
import { Beer } from "../mocks/handlers"
import { buttonStyles } from "./BeerInfo"
import Link from "next/link"
// import { ReactComponent as TrashIcon } from "./trashIcon.svg"

export const GET_BEERS_BY_IDS = gql`
	query GetBeersByIds($ids: [Int]) {
		beers(ids: $ids) {
			id
			name
			price
		}
	}
`

const Cart = () => {
	const dispatch = useCartDispatch()
	const { cart } = useCartState()

	const cartIds = cart.reduce((item, currentValue) => {
		return [...item, currentValue.id]
	}, [])

	const { loading, error, data } = useQuery<{ beers: Beer[] }>(
		GET_BEERS_BY_IDS,
		{
			variables: { ids: cartIds },
		}
	)

	useEffect(() => {
		dispatch({ type: CartActionType.hydrateCart })
	}, [])

	const handleRemove = (id: number) => {
		dispatch({ type: CartActionType.removeItem, payload: { id } })
	}
	const handleDecrement = (id: number) => {
		dispatch({ type: CartActionType.decrement, payload: { id } })
	}
	const handleIncrement = (id: number) => {
		dispatch({ type: CartActionType.increment, payload: { id } })
	}

	const { beers } = data ?? {}

	return (
		<CartDrawer>
			<CartContent>
				<h2>Cart</h2>
				{beers?.length === 0 ? <p>Add some bottles!</p> : null}
				<CartList>
					{!loading &&
						beers &&
						beers.map((beer) => {
							const { id, name, price } = beer
							const qty = cart.find((item) => item.id === id).qty
							return (
								<CartItem key={id}>
									<CartItemInfo>
										<Link href={`/${id}`}>
											<a>
												<h4>{name}</h4>
											</a>
										</Link>
										<span>
											${price}
											<small> / bottle</small>
										</span>
									</CartItemInfo>
									<CartItemButtons>
										<CartButton
											onClick={() => handleDecrement(id)}
										>
											➖
										</CartButton>
										<span>{qty}</span>
										<CartButton
											onClick={() => handleIncrement(id)}
										>
											➕
										</CartButton>
										<RemoveButton
											onClick={() => handleRemove(id)}
										>
											<small>Delete</small>
										</RemoveButton>
									</CartItemButtons>
								</CartItem>
							)
						})}
				</CartList>
			</CartContent>
		</CartDrawer>
	)
}

const CartDrawer = styled.div`
	position: relative;
	padding: 0 2rem;
	grid-column: 2 / 3;
	grid-row: 1 / 2;
	background-color: var(--background);
	color: var(--text-color);
`

const CartContent = styled.div`
	position: sticky;
	top: 0;
	padding: 2rem 0;
`

const CartList = styled.ul`
	list-style-type: none;
	padding: 0;
	display: grid;
	grid-template-rows: auto;
	gap: 2rem;
`

const CartItem = styled.li``

const CartItemInfo = styled.div`
	margin-bottom: 0.5rem;
	h4 {
		margin-bottom: 0.25rem;
	}
`

const CartItemButtons = styled.div`
	display: grid;
	grid-template-columns: min-content 20px min-content min-content;
	gap: 0.5rem;
	text-align: center;
	align-items: center;
`

const CartButton = styled.button`
	${buttonStyles}
	font-size: 0.75rem;
	padding: 0.5rem 0.75rem;
	&:not(:last-of-type) {
		border-bottom: 1px solid gray;
	}
`

const RemoveButton = styled.button`
	all: unset;
`

export default Cart
