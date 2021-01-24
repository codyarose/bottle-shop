import React, { FC } from "react"
import {
	CartActionType,
	useCartDispatch,
	useCartState,
} from "../context/CartContext"

interface Props {}

const Cart: FC<Props> = () => {
	const dispatch = useCartDispatch()
	const { cart } = useCartState()

	const handleRemove = (id: number) => {
		dispatch({ type: CartActionType.removeItem, payload: { id } })
	}
	return (
		<div>
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
		</div>
	)
}

export default Cart
