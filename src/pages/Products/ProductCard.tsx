import { BASE_URL } from "@api/axiosInstance";
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
					title="Eliminar"
					type="button"
					onClick={() => onDelete(product)}
					className="text-neutral-400 hover:text-red-500 hover:cursor-pointer transition-colors outline-none focus:outline-none"
				>
					<Trash size={16} />
				</button>
			</header>
			<figure className="my-2 overflow-hidden rounded-md w-full flex items-center justify-center">
				<div>
					<img
						src={
							product?.img
								? `${BASE_URL}${product.img}`
								: "assets/img/placeholder.webp"
						}
						alt={product?.name}
						className="w-60 h-45 rounded-md"
					/>
				</div>
			</figure>
			<footer className="flex flex-col gap-1">
				<span className="text-sm text-neutral-500">
					{product?.stock?.quantity} disponibles
				</span>
				<span className="font-semibold">
					${Number(product.price).toFixed(2)}
				</span>
				<div className="flex gap-1 mt-1 justify-center">
					<Button title="Editar" onClick={() => onEdit(product)}>
						<Pencil size={12} />
					</Button>
					<Button
						variant="ghost"
						title="Ajustar stock"
						onClick={() => onAdjustStock(product)}
					>
						<PackagePlus size={12} />
					</Button>
				</div>
			</footer>
		</article>
	);
};

export default ProductCard;
