import type { Area } from "react-easy-crop";

const createImage = (url: string): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
		const image = new Image();

		image.addEventListener("load", () => resolve(image));
		image.addEventListener("error", (error) => reject(error));

		image.setAttribute("crossOrigin", "anonymous");
		image.src = url;
	});

const getCroppedImg = async (imageSrc: string, crop: Area): Promise<Blob> => {
	const image = await createImage(imageSrc);

	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	if (!ctx) {
		throw new Error("No se pudo crear el canvas");
	}

	canvas.width = 250;
	canvas.height = 250;

	ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, 250, 250);

	return new Promise((resolve, reject) => {
		canvas.toBlob(
			(blob) => {
				if (!blob) {
					reject(new Error("No se pudo generar la imagen"));
					return;
				}

				resolve(blob);
			},
			"image/webp",
			0.8,
		);
	});
};

export default getCroppedImg;
