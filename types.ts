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
