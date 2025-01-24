export type ProductType = {
	id: number
	name: string
	price: number
	category: string
	image: string
}
export type ProductsResponse = {
	products: ProductType[]
}
