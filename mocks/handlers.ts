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
	graphql.query("GetOneBeer", (req, res, ctx) => {
		const { id } = req.variables
		const beer = beers.filter((beer) => beer.id === id)[0]
		if (!beer) {
			return res(
				ctx.errors([
					{
						message: "Page not found!",
					},
				])
			)
		}
		return res(
			ctx.data({
				beer,
			})
		)
	}),
	graphql.query("GetBeersByIds", (req, res, ctx) => {
		const { ids } = req.variables
		const beerList = beers.filter((item) => ids.indexOf(item.id) !== -1)

		return res(
			ctx.data({
				beers: beerList,
			})
		)
	}),
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
			})
		)
	}),
]
