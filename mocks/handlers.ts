import { graphql } from "msw"
import { beers } from "../seed"

export interface Brewery {
	id: number
	name: string
	location: string
}

export type Styles = "IPA" | "Stout"

export interface Beer {
	id: number
	name: string
	image: string
	description: string
	style: Styles
	abv: number
	price: number
	brewery: Brewery
}

export const handlers = [
	graphql.query("GetBeers", (req, res, ctx) => {
		const { nameFilter, styleFilter } = req.variables
		const beerList = beers.filter(
			(beer) =>
				beer.name.toLowerCase().includes(nameFilter) &&
				(styleFilter === "all" || beer.style === styleFilter)
		)
		return res(
			ctx.data({
				beers: beerList,
				count: beerList.length,
			})
		)
	}),
	graphql.mutation("Login", (req, res, ctx) => {
		const { username } = req.variables
		if (typeof window !== "undefined") {
			window.sessionStorage.setItem("is-authenticated", username)
		}

		return res(
			ctx.data({
				login: {
					username,
				},
			})
		)
	}),
	graphql.query("GetUserInfo", (_req, res, ctx) => {
		let authenticatedUser: string
		if (typeof window !== "undefined") {
			authenticatedUser = window.sessionStorage.getItem(
				"is-authenticated"
			)
		}

		if (!authenticatedUser) {
			return res(
				ctx.errors([
					{
						message: "Not authenticated",
						errorType: "AuthenticationError",
					},
				])
			)
		}

		return res(
			ctx.data({
				user: {
					username: authenticatedUser,
				},
			})
		)
	}),
]
