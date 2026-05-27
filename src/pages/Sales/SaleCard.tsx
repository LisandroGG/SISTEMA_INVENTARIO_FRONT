import Button from "@components/Common/Button";
import type { Sale } from "@redux/features/sale/saleTypes";
import { Check, ReceiptText, Trash } from "lucide-react";

const statusLabel: Record<string, string> = {
	completed: "Completada",
	cancelled: "Cancelada",
};

const statusColor: Record<string, string> = {
	completed: "bg-primary/10 text-primary",
	cancelled: "bg-red-500/10 text-red-500",
};

const statusIcon: Record<string, React.ReactNode> = {
	completed: <Check size={16} />,
	cancelled: <Trash size={16} />,
};

type SaleCardProps = {
	sale: Sale;
	onViewDetail: (id: number) => void;
};

const SaleCard = ({ sale, onViewDetail }: SaleCardProps) => {
	return (
		<div className="flex items-center gap-4 p-4 shadow-md rounded-lg border bg-white border-neutral-200">
			<div
				className={`p-2 rounded-full shrink-0 ${statusColor[sale.status] ?? "bg-neutral-100 text-neutral-600"}`}
			>
				{statusIcon[sale.status] ?? <ReceiptText size={16} />}
			</div>
			<div className="flex-1 min-w-0">
				<span className="text-sm font-semibold text-neutral-800">
					Venta #{sale.id} - {sale.clientName}
				</span>
				<p className="text-sm text-neutral-600">
					{sale.items.length}{" "}
					{sale.items.length === 1 ? "artículo" : "artículos"} - $
					{sale.total.toFixed(2)}
				</p>
				<span className="text-xs text-neutral-400 block mt-1">
					{sale.createdAt
						? new Date(sale.createdAt).toLocaleString("es-AR", {
								day: "2-digit",
								month: "2-digit",
								year: "numeric",
								hour: "2-digit",
								minute: "2-digit",
								hour12: false,
							})
						: null}
				</span>
			</div>
			<div className="ml-auto flex items-center text-center">
				<span
					className={`w-25 px-2 py-1 text-sm rounded ${statusColor[sale.status]}`}
				>
					{statusLabel[sale.status] || sale.status}
				</span>
			</div>
			<Button
				variant="danger"
				title="Ver detalle"
				onClick={() => onViewDetail(sale.id)}
			>
				<ReceiptText size={16} />
			</Button>
		</div>
	);
};

export default SaleCard;
