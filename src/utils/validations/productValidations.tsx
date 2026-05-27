const productNameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 .,_-]+$/;
const positiveNumberRegex = /^(?:0|[1-9]\d*)(?:\.\d+)?$/;
const positiveIntegerRegex = /^[1-9]\d*$/;

type name = string;
type price = number | string;
type quantity = number | string;
type categoryId = number;
type stock = number | string;

export const validateProductName = (name: name) => {
	if (!name?.trim()) return "El nombre es obligatorio";

	if (!productNameRegex.test(name.trim())) {
		return "El nombre solo puede contener letras, números, espacios y los caracteres especiales: . , _ -";
	}

	return null;
};

export const validateProductPrice = (price: price) => {
	if (price === null || price === undefined || price === "") {
		return "El precio es obligatorio";
	}

	const value = String(price).trim();

	if (!positiveNumberRegex.test(value)) {
		return "El precio debe ser un numero válido";
	}

	if (Number(value) <= 0) {
		return "El precio debe ser mayor a 0";
	}

	return null;
};

export const validateProductQuantity = (quantity: quantity) => {
	if (quantity === null || quantity === undefined || quantity === "") {
		return "La cantidad es obligatoria";
	}

	const value = String(quantity).trim();

	if (!positiveIntegerRegex.test(value)) {
		return "La cantidad debe ser un número mayor a 0";
	}

	return null;
};

export const validateProductCategoryId = (categoryId: categoryId) => {
	if (!categoryId) return "Debe seleccionar una categoria";
	return null;
};

export const validateQuantity = (quantity: stock, minQuantity: stock) => {
	if (quantity === null || quantity === undefined || quantity === "") {
		return "El stock es obligatorio";
	}

	if (minQuantity === null || minQuantity === undefined || minQuantity === "") {
		return "El stock minimo es obligatorio";
	}

	const value = String(quantity).trim();
	const value2 = String(minQuantity).trim();

	if (!positiveNumberRegex.test(value)) {
		return "El stock debe ser un numero válido";
	}

	if (!positiveNumberRegex.test(value2)) {
		return "El stock minimo debe ser un numero válido";
	}

	if (Number(value) <= 0) {
		return "El stock debe ser mayor a 0";
	}

	if (Number(value2) <= 0) {
		return "El stock minimo debe ser mayor a 0";
	}

	return null;
};

export const validateCreateProduct = (
	name: name,
	price: price,
	quantity: quantity,
	categoryid: categoryId,
) => {
	return (
		validateProductName(name) ||
		validateProductPrice(price) ||
		validateProductQuantity(quantity) ||
		validateProductCategoryId(categoryid)
	);
};

export const validateUpdateProduct = (
	name: name,
	price: price,
	categoryid: categoryId,
) => {
	return (
		validateProductName(name) ||
		validateProductPrice(price) ||
		validateProductCategoryId(categoryid)
	);
};
