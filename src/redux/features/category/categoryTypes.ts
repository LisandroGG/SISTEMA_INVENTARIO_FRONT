export type Category = {
	id: number;
	name: string;
	description?: string;
};

export type CategoryState = {
	categories: Category[];
	category: Category | null;
	loading: boolean;
	error: string | null;
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
