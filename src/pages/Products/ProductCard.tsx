import Button from "@components/Common/Button";
import type { Product } from "@redux/features/products/productTypes";
import { PackagePlus, Pencil, Trash } from "lucide-react";

type ProductCardProps = {
	product: Product;
	onEdit: (product: Product) => void;
	onDelete: (product: Product) => void;
	onAdjustStock: (product: Product) => void;
};

const ProductCard = ({
	product,
	onEdit,
	onDelete,
	onAdjustStock,
}: ProductCardProps) => {
	return (
		<article className="bg-white p-3 rounded-md shadow-md flex flex-col">
			<header className="flex items-start justify-between gap-2 flex-1">
				<div>
					<span className="text-xs text-neutral-400 uppercase">
						{product?.category?.name}
					</span>
					<h2 className="font-semibold">{product.name}</h2>
				</div>
				<button
					type="button"
					onClick={() => onDelete(product)}
					className="text-neutral-400 hover:text-red-500 hover:cursor-pointer transition-colors"
				>
					<Trash size={16} />
				</button>
			</header>
			<figure className="w-full h-45 my-2 overflow-hidden rounded-md">
				<img
					src={product?.img ?? "assets/img/placeholder.webp"}
					alt={product?.name}
					className="w-full h-full rounded-md"
				/>
			</figure>
			<footer className="flex flex-col gap-1">
				<span className="text-sm text-neutral-500">
					{product?.stock?.quantity} disponibles
				</span>
				<span className="font-semibold">
					${Number(product.price).toFixed(2)}
				</span>
				<div className="flex gap-1 mt-1 justify-center">
					<Button onClick={() => onEdit(product)}>
						<Pencil size={12} />
					</Button>
					<Button variant="ghost" onClick={() => onAdjustStock(product)}>
						<PackagePlus size={12} />
					</Button>
				</div>
			</footer>
		</article>
	);
};

export default ProductCard;
