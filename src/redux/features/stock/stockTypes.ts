export type Product = {
	id: number;
	name: string;
	description?: string;
	price: number;
	img?: string;
	categoryId: number;
};

export type Stock = {
	id: number;
	productId: number;
	quantity: number;
	minQuantity: number;

	product: Product;
};

export type StockState = {
	stocks: Stock[];
	stock: Stock | null;
	loading: boolean;
	error: string | null;
};

export type StockResponse = {
	stock: Stock;
	message: string;
};

export type AdjustStockData = {
	id: number;
	quantity: number;
	reason?: string;
};

export type MinStockData = {
	id: number;
	minQuantity: number;
};
