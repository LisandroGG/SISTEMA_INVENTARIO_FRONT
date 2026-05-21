export type Product = {
	id: number;
	name: string;
	description?: string;
	price: number;
	img?: string;
	categoryId: number;
};

export type SaleItem = {
	id: number;
	saleId: number;
	productId: number;
	quantity: number;
	unitPrice: number;
	product: Product;
};

export type Sale = {
	id: number;
	clientName: string;
	status: "completed" | "cancelled";
	total: number;
	notes?: string;
	createdAt?: string;
	updatedAt?: string;

	items: SaleItem[];
};

export type SaleState = {
	sales: Sale[];
	sale: Sale | null;
	loading: boolean;
	error: string | null;
	page: number;
	totalPages: number;
	totalItems: number;
	limit: number;
	hasNext: boolean;
	hasPrev: boolean;
};

export type GetSalesParams = {
	page?: number;
	limit?: number;
	status?: string;
};

export type GetSalesResponse = {
	data: Sale[];
	page: number;
	totalPages: number;
	totalItems: number;
	hasNext: boolean;
	hasPrev: boolean;
};

export type SaleResponse = {
	sale: Sale;
	message: string;
};

export type CreateSaleItem = {
	productId: number;
	quantity: number;
};

export type CreateSaleData = {
	items: CreateSaleItem[];
	clientName: string;
};
