const positiveIntegerRegex = /^[1-9]\d*$/;
const clientNameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 ]+$/;

type clientName = string;

type saleItem = {
	productId: number;
	quantity: number;
};

export const validateSaleClientName = (clientName: clientName) => {
	if (!clientName.trim()) {
		return "El nombre del cliente es obligatorio";
	}

	if (!clientNameRegex.test(clientName.trim())) {
		return "El nombre del cliente solo puede contener letras y números";
	}

	return null;
};

export const validateSaleItems = (items: saleItem[]) => {
	if (!items.length) {
		return "Debe agregar al menos un producto";
	}

	for (const item of items) {
		if (!item.productId || item.productId <= 0) {
			return "Debe seleccionar un producto válido";
		}

		const quantity = String(item.quantity).trim();

		if (!positiveIntegerRegex.test(quantity)) {
			return "La cantidad debe ser mayor a 0";
		}
	}

	return null;
};

export const validateCreateSale = (
	clientName: clientName,
	items: saleItem[],
) => {
	return validateSaleClientName(clientName) || validateSaleItems(items);
};
