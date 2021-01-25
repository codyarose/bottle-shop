import { css } from "@emotion/react"

export const content = css`
	width: 100%;
	max-width: 1024px;
	padding: 0 2rem;
	margin: 0 auto;
`

export const buttonReset = css`
	display: inline-block;
	border: none;
	padding: 1rem;
	margin: 0;
	text-decoration: none;
	background: lightgray;
	color: #000;
	font-family: inherit;
	font-size: 1rem;
	cursor: pointer;
	text-align: center;
	transition: background 250ms ease-in-out, transform 150ms ease;
	-webkit-appearance: none;
	-moz-appearance: none;
	&:hover,
	&:focus {
		background: gray;
	}

	&:active {
		transform: none;
	}
`
