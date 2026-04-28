import type { Product } from "@redux/features/products/productTypes"

type ProductCardProps = {
    product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <article>
            <img src={product.img ?? "/placeholder.png"} alt={product.name} />
            <h2>{product.name}</h2>
            <span>${product.price}</span>
            <span>{product.category.name}</span>
            <span>{product.stock.quantity} en stock</span>
        </article>
    )
}

export default ProductCard