export type Product = {
	id: number;
	name: string;
};

export type Movement = {
	id: number;
	productId: number;
	saleId: number | null;
	type: "IN" | "OUT";
	quantity: number;
	reason?: string;
	createdAt?: string;
	updatedAt?: string;

	product: Product;
};

export type MovementState = {
	movements: Movement[];
	loading: boolean;
	error: string | null;
	page: number;
	totalPages: number;
	totalItems: number;
	limit: number;
	hasNext: boolean;
	hasPrev: boolean;
};

export type GetMovementsParams = {
	page?: number;
	limit?: number;
	type?: string;
	productId?: number;
	dateFrom?: string;
	dateTo?: string;
};

export type GetMovementsResponse = {
	data: Movement[];
	page: number;
	totalPages: number;
	totalItems: number;
	hasNext: boolean;
	hasPrev: boolean;
};
