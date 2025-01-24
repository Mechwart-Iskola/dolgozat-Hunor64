import { ProductsResponse } from "../types/ProductType"

export const fetchProducts = async () => {
	try {
		const res = await fetch("/products.json")
		if (!res.ok) {
			throw new Error()
		}
		const data: ProductsResponse = await res.json()
		console.log(data.products)
		return data.products
	} catch (error) {
		console.error(error)
	}
}
