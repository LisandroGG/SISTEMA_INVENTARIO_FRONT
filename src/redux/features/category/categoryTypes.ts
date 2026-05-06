export type Category = {
	id: number;
	name: string;
	description?: string;
	totalProducts?: number;
};

export type CategoryState = {
	categories: Category[];
	category: Category | null;
	loading: boolean;
	error: string | null;
	page: number;
	totalPages: number;
	totalItems: number;
	limit: number;
	hasNext: boolean;
	hasPrev: boolean;
};

export type GetCategoriesParams = {
	page?: number;
	limit?: number;
	name?: string;
};

export type GetCategoryResponse = {
	data: Category[];
	page: number;
	totalPages: number;
	totalItems: number;
	hasNext: boolean;
	hasPrev: boolean;
};

export type CategoryResponse = {
	category: Category;
	message: string;
};

export type DeleteCategoryResponse = {
	id: number;
	message: string;
};

export type CreateCategoryData = {
	name: string;
	description?: string;
};

export type UpdateCategoryData = {
	id: number;
	name: string;
	description?: string;
};
