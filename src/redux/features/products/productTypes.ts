export type Category = {
	id: number;
	name: string;
};

export type Stock = {
	id: number;
	productId: number;
	quantity: number;
};

export type Product = {
	id: number;
	name: string;
	price: number;
	description: string;
	categoryId: number;
	img?: string;

	category: Category;
	stock: Stock;

	createdAt: string;
	updatedAt: string;
};

export type ProductState = {
	products: Product[];
	product: Product | null;
	loading: boolean;
	error: string | null;
	page: number;
	totalPages: number;
	totalItems: number;
	limit: number;
	hasNext: boolean;
	hasPrev: boolean;
};

export type GetProductsParams = {
	page?: number;
	limit?: number;
	name?: string;
	categoryId?: number;
};

export type GetProductsResponse = {
	data: Product[];
	page: number;
	totalPages: number;
	totalItems: number;
	hasNext: boolean;
	hasPrev: boolean;
};

export type ProductResponse = {
	product: Product;
	message: string;
};

export type DeleteProductResponse = {
	message: string;
};

export type CreateProductData = {
	name: string;
	price: number;
	description?: string;
	categoryId: number;
	quantity?: number;
	img?: File;
};

export type UpdateProductData = {
	id: number;
	name: string;
	price: number;
	description?: string;
	categoryId: number;
	img?: File;
};
