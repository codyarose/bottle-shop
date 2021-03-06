import { createContext, Dispatch, FC, useContext, useReducer } from "react"

interface CartState {
	cart: {
		id: number
		qty: number
	}[]
}
type CartDispatch = Dispatch<{
	type: CartActionType
	payload?: {
		id: number
		qty: number
	}
}>

export enum CartActionType {
	addItem,
	removeItem,
	hydrateCart,
	increment,
	decrement,
}
const CartStateContext = createContext<CartState | undefined>(undefined)
const CartDispatchContext = createContext<CartDispatch | undefined>(undefined)

const removeById = (arr: any[], id: number | undefined) =>
	arr.filter((item) => item.id !== id)

const updateQty = (
	arr: any[],
	id: number | undefined,
	type: "increment" | "decrement"
) =>
	arr.map((item) => {
		if (item.id === id) {
			if (type === "increment") {
				return Object.assign({}, item, { qty: item.qty + 1 })
			} else if (type === "decrement") {
				return Object.assign({}, item, { qty: item.qty - 1 })
			}
		}
		return item
	})

const cartReducer = (
	state: CartState,
	action: { type: CartActionType; payload?: { id: number; qty: number } }
): CartState => {
	switch (action.type) {
		case CartActionType.hydrateCart: {
			if (window.localStorage.getItem("cart") === null) {
				window.localStorage.setItem("cart", JSON.stringify([]))
			}
			const storedCart = window.localStorage.getItem("cart") || ""
			return { cart: JSON.parse(storedCart) }
		}
		case CartActionType.addItem: {
			if (state.cart.find((item) => item.id === action.payload?.id)) {
				const newCart = updateQty(
					state.cart,
					action.payload?.id,
					"increment"
				)
				window.localStorage.setItem("cart", JSON.stringify(newCart))
				return { cart: newCart }
			}

			const newCart = action.payload
				? [...state.cart, action.payload]
				: [...state.cart]
			window.localStorage.setItem("cart", JSON.stringify(newCart))
			return { cart: newCart }
		}
		case CartActionType.increment: {
			const newCart = updateQty(
				state.cart,
				action.payload?.id,
				"increment"
			)
			window.localStorage.setItem("cart", JSON.stringify(newCart))
			return { cart: newCart }
		}
		case CartActionType.decrement: {
			const item = state.cart.find(
				(item) => item.id === action.payload?.id
			)
			if (item?.qty === 1) {
				const newCart = removeById(state.cart, action.payload?.id)
				window.localStorage.setItem("cart", JSON.stringify(newCart))
				return { cart: newCart }
			}
			const newCart = updateQty(
				state.cart,
				action.payload?.id,
				"decrement"
			)
			window.localStorage.setItem("cart", JSON.stringify(newCart))
			return { cart: newCart }
		}
		case CartActionType.removeItem: {
			const newCart = removeById(state.cart, action.payload?.id)
			window.localStorage.setItem("cart", JSON.stringify(newCart))
			return { cart: newCart }
		}
		default:
			return { cart: [] }
	}
}

const CartProvider: FC = ({ children }) => {
	const initialState: CartState = { cart: [] }
	const [state, dispatch] = useReducer(cartReducer, initialState)
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
