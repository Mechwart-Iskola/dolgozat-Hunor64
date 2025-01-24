import { useEffect, useState } from "react"
import { ProductType } from "../types/ProductType"
import { fetchProducts } from "../Services/ProductService"

const ProductCard = () => {
	const [searchProduct, setSearchProduct] = useState("")
	const [products, setProducts] = useState<ProductType[]>()
	const [product, setProduct] = useState<ProductType | null>()
	const [error, setError] = useState("")

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchProduct(e.target.value)
	}

	const findProduct = () => {
		let found
		products?.map((prod) => {
			if (prod.name.toLowerCase().includes(searchProduct.toLowerCase()) || prod.id == Number.parseInt(searchProduct)) {
				found = prod
			}
		})
		if (found) {
			if(searchProduct == ""){
				setProduct(null)
				setError("")
			}
			else{
				setProduct(found)
				setError("")
			}
		} else {
			setProduct(null)
			setError("No product found with the given name.")
		}
	}

	useEffect(() => {
		fetchProducts().then((res) => setProducts(res))
	}, [])
	return (
		<div className="product-card">
			<div className="search-section">
				<label>Enter Product Name:</label>
				<input type="text" onChange={handleSearch} />
				<button type="submit" onClick={findProduct}>
					Search
				</button>
			</div>
			{product ? (
				<div className="results-section">
					<div className="product-info">
						<img className="product-image" src={product?.image} />
						<div className="product-details">
							<p>ID: {product?.id}</p>
							<p>Name: {product?.name}</p>
							<p>Price: ${product?.price}</p>
							<p>Category: {product?.category}</p>
						</div>
					</div>
				</div>
			) : (
				<div className="error">{error}</div>
			)}
		</div>
	)
}

export default ProductCard
