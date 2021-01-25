import React, { FC } from "react"
import Link from "next/link"
import styled from "@emotion/styled"
import {
	useCartDispatch,
	useCartState,
	CartActionType,
} from "../context/CartContext"
import { buttonStyles } from "../styles/utils"
import { Beer } from "../types"

interface Props {
	beer: Beer
	layout?: "card" | "full"
}

const BeerInfo: FC<Props> = ({ beer, layout = "full" }) => {
	const dispatch = useCartDispatch()
	const { cart } = useCartState()
	const handleAddToCart = (id: number) => {
		dispatch({ type: CartActionType.addItem, payload: { id, qty: 1 } })
	}
	const handleDecrement = (id: number) => {
		dispatch({ type: CartActionType.decrement, payload: { id, qty: 1 } })
	}

	const getCartItem = (id: number) => {
		return cart.find((item) => item.id === id)
	}

	const { id, image, name, style, abv, price, description } = beer

	const cartItem = getCartItem(id)
	const isInCart = Boolean(cartItem)

	return (
		<Item layout={layout} key={id}>
			<ItemImage src={image} alt={`${name} label`} />
			<ItemBody layout={layout}>
				<ItemTitle>
					<Link href={`/${id}`}>
						<a>{name}</a>
					</Link>
				</ItemTitle>
				<ItemDetails layout={layout}>
					<small>Style: {style}</small>
					<small>ABV: {abv}%</small>
				</ItemDetails>
				{description ? <p>{description}</p> : null}
				<ItemPrice>${price}</ItemPrice>
				<CartButtons>
					{isInCart && (
						<CartDecrement onClick={() => handleDecrement(id)}>
							-
						</CartDecrement>
					)}
					<CartAdd
						isInCart={isInCart}
						onClick={() => handleAddToCart(id)}
					>
						{isInCart ? `${cartItem?.qty} added` : "add to cart"}
					</CartAdd>
				</CartButtons>
			</ItemBody>
		</Item>
	)
}
const Item = styled.div<Partial<Props>>`
	${({ layout }) =>
		layout === "card"
			? `

	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	padding: 1.5rem 1rem;
	`
			: null}
	${({ layout }) =>
		layout === "full"
			? `
		display: grid;
		grid-template-columns: 100px auto;
		gap: 1rem;
		padding: 2rem;
		`
			: null}
	border: 1px solid lightgray;
	border-radius: 3px;
`

const ItemImage = styled.img`
	width: 100px;
	height: 100px;
	object-fit: cover;
	object-position: center;
`

const ItemBody = styled.div<Partial<Props>>`
	width: 100%;
	display: grid;
	grid-template-rows: repeat(4, auto);
	gap: 1rem;
	margin: 1rem 0 0;
	${({ layout }) =>
		layout === "full"
			? `
		align-items: flex-start;
	`
			: null}
`

const ItemTitle = styled.h2`
	font-size: 1.25rem;
	margin-bottom: 0;
`

const ItemDetails = styled.div<Partial<Props>>`
	display: grid;
	gap: 1rem;
	white-space: nowrap;
	grid-template-columns: ${({ layout }) =>
		layout === "card"
			? `
		repeat(2, 1fr)
	`
			: `repeat(2, min-content)`};
`

const ItemPrice = styled.span`
	font-size: 1.5rem;
`

const CartButtons = styled.div`
	display: grid;
	grid-template-columns: min-content 1fr;
	width: 100%;
	max-width: 300px;
`

const CartAdd = styled.button<{ isInCart: boolean }>`
	${buttonStyles}
	position: relative;
	grid-column: 2 / 3;
	${({ isInCart }) =>
		isInCart
			? `
	padding-left: 0;
	padding-right: 2rem;
	`
			: null}
	&:before {
		${({ isInCart }) => (isInCart ? "content: '+'" : "content: ''")};
		position: absolute;
		top: 50%;
		right: 1rem;
		transform: translateY(-50%);
	}
`
const CartDecrement = styled.button`
	${buttonStyles}
`

export default BeerInfo
