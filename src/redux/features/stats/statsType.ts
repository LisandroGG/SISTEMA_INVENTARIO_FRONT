export type Product = {
	id: number;
	name: string;
};

export type LowStockProduct = {
	id: number;
	productId: number;
	quantity: number;
	minQuantity: number;
	product: Product;
};

export type SaleItem = {
	id: number;
	saleId: number;
	productId: number;
	quantity: number;
	unitPrice: number;
};

export type RecentSale = {
	id: number;
	clientName: string;
	status: "completed" | "cancelled";
	total: number;
	createdAt?: string;
	updatedAt?: string;

	items: SaleItem[];
};

export type RecentMovement = {
	id: number;
	productId: number;
	saleId: number;
	type: "IN" | "OUT";
	quantity: number;
	reason?: string;
	createdAt?: string;
	updatedAt?: string;

	product: Product;
};

export type Stats = {
	totalProducts: number;
	totalCategories: number;
	monthlySalesCount: number;
	totalMonthlyRevenue: number;
	lowStockProducts: LowStockProduct[];
	recentSales: RecentSale[];
	recentMovements: RecentMovement[];
};

export type statsState = {
	stats: Stats | null;
	loading: boolean;
};
