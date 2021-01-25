import React, { useEffect } from "react"
import styled from "@emotion/styled"
import {
	CartActionType,
	useCartDispatch,
	useCartState,
} from "../context/CartContext"

const Cart = () => {
	const dispatch = useCartDispatch()
	const { cart } = useCartState()

	useEffect(() => {
		dispatch({ type: CartActionType.hydrateCart })
	}, [])

	const handleRemove = (id: number) => {
		dispatch({ type: CartActionType.removeItem, payload: { id } })
	}
	return (
		<CartDrawer>
			<ul>
				{cart.map((item) => {
					const { id } = item
					return (
						<li key={id}>
							{id}
							<button onClick={() => handleRemove(id)}>
								remove
							</button>
						</li>
					)
				})}
			</ul>
		</CartDrawer>
	)
}

const CartDrawer = styled.div`
	padding: 3rem 1rem;
	grid-column: 2 / 3;
	grid-row: 1 / 2;
`

export default Cart
