import { Beer } from "./types"

export const beers: Beer[] = [
	{
		id: 1,
		name: "Pliny The Younger",
		image:
			"https://untappd.akamaized.net/site/beer_logos/beer-_28331_sm.jpeg",
		description:
			'Pliny the Younger was Pliny the Elder’s nephew, in the case of this beer, the "Younger" is a triple IPA. Pliny the Younger is hopped three times more than our standard IPA, and is dry hopped four different times.',
		style: "IPA",
		abv: 10.25,
		price: 20,
		brewery: {
			id: 1,
			name: "Russian River Brewing Company",
			location: "California, USA",
		},
	},
	{
		id: 2,
		name: "Bomb!",
		image:
			"https://untappd.akamaized.net/site/beer_logos/beer-2594546_b6edf_sm.jpeg",
		description:
			"Imperial stout aged on coffee, cacao nibs, vanilla beans, and ancho chili peppers.",
		style: "Stout",
		abv: 13,
		price: 9,
		brewery: {
			id: 2,
			name: "Prairie Artisan Ales",
			location: "Oklahoma, USA",
		},
	},
	{
		id: 3,
		name: "Enigma Singularity",
		image:
			"https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png",
		description: "",
		style: "IPA",
		abv: 6.8,
		price: 9,
		brewery: {
			id: 3,
			name: "Trimtab Brewing Company",
			location: "Alabama, USA",
		},
	},
	{
		id: 4,
		name: "Cloud Architecture",
		image:
			"https://untappd.akamaized.net/site/beer_logos/beer-3256748_f1dea_sm.jpeg",
		description: "DDH Marshmallow Hazy Double IPA",
		style: "IPA",
		abv: 8.5,
		price: 9,
		brewery: {
			id: 3,
			name: "Trimtab Brewing Company",
			location: "Alabama, USA",
		},
	},
	{
		id: 5,
		name: "Double Shot",
		image:
			"https://untappd.akamaized.net/site/beer_logos/beer-621649_cceb6_sm.jpeg",
		description:
			"Double Shot is Tree House's Coffee Stout infused with Stumptown Coffee Roasters Finca El Injerto and locally roasted Sumatra.",
		style: "Stout",
		abv: 7.6,
		price: 11,
		brewery: {
			id: 4,
			name: "Tree House Brewing Company",
			location: "Massachusetts, USA",
		},
	},
]

export const breweries = [
	{
		id: 1,
		name: "Russian River Brewing Company",
		location: "California, USA",
	},
	{
		id: 2,
		name: "Prairie Artisan Ales",
		location: "Oklahoma, USA",
	},
	{
		id: 3,
		name: "Trimtab Brewing Company",
		location: "Alabama, USA",
	},
	{
		id: 4,
		name: "Tree House Brewing Company",
		location: "Massachusetts, USA",
	},
]
