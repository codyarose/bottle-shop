import { createContext, Dispatch, useContext, useReducer } from "react"

interface CartState {
	cart: any[]
}
type CartDispatch = Dispatch<{
	type: CartActionType
	payload: {
		id: number
	}
}>

export enum CartActionType {
	addItem = "addItem",
	removeItem = "removeItem",
}

const CartStateContext = createContext<CartState | undefined>(undefined)
const CartDispatchContext = createContext<CartDispatch | undefined>(undefined)

const cartReducer = (
	state: CartState,
	action: { type: CartActionType; payload: { id: number } }
) => {
	switch (action.type) {
		case CartActionType.addItem: {
			if (state.cart.find((item) => item.id === action.payload.id)) {
				return { cart: state.cart }
			}

			const newCart = [...state.cart, action.payload]
			return { cart: newCart }
		}
		case CartActionType.removeItem: {
			// const newCart = [...state.cart].splice(
			// 	state.cart.findIndex((a) => a.id === action.payload.id),
			// 	1
			// )
			const newCart = state.cart.filter(
				(item) => item.id !== action.payload.id
			)
			return { cart: newCart }
		}
		default:
			break
	}
}

const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, { cart: [] })
	return (
		<CartStateContext.Provider value={state}>
			<CartDispatchContext.Provider value={dispatch}>
				{children}
			</CartDispatchContext.Provider>
		</CartStateContext.Provider>
	)
}

const useCartState = () => {
	const context = useContext(CartStateContext)
	if (context === undefined) {
		throw new Error("useCartState must be used within a CartProvider")
	}
	return context
}
const useCartDispatch = () => {
	const context = useContext(CartDispatchContext)
	if (context === undefined) {
		throw new Error("useCartDispatch must be used within a CartProvider")
	}
	return context
}

export { CartProvider, useCartState, useCartDispatch }