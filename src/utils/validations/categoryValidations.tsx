const categoryNameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 .,_-]+$/;

type name = string;

export const validateCategoryName = (name: name) => {
	if (!name?.trim()) return "El nombre es obligatorio";

	if (!categoryNameRegex.test(name.trim())) {
		return "El nombre solo puede contener letras, números, espacios y los caracteres especiales: . , _ -";
	}

	return null;
};

export const validateCategory = (name: name) => {
	return validateCategoryName(name);
};
