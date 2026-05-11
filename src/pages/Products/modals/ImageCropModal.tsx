import Modal from "@components/Common/Modal";
import getCroppedImg from "@utils/cropImage";
import { useCallback, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";

type ImageCropModalProps = {
	open: boolean;
	image: string;
	onCancel: () => void;
	onConfirm: (file: File) => void;
};

const ImageCropModal = ({
	open,
	image,
	onCancel,
	onConfirm,
}: ImageCropModalProps) => {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

	const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
		setCroppedAreaPixels(croppedAreaPixels);
	}, []);

	const handleConfirm = async () => {
		if (!croppedAreaPixels) return;

		try {
			const blob = await getCroppedImg(image, croppedAreaPixels);

			const file = new File([blob], "product-image.webp", {
				type: "image/webp",
			});

			onConfirm(file);
		} catch (error) {
			console.error(error);
		}
	};

	if (!open) return null;

	return (
		<Modal
			title="Recortar imagen"
			confirmText="Confirmar"
			onCancel={onCancel}
			onSubmit={handleConfirm}
		>
			<div className="relative w-75 h-75 bg-secondary rounded-lg overflow-hidden">
				<Cropper
					image={image}
					crop={crop}
					zoom={zoom}
					aspect={1}
					cropShape="rect"
					showGrid={false}
					restrictPosition
					cropSize={{ width: 250, height: 250 }}
					minZoom={1}
					maxZoom={3}
					onCropChange={setCrop}
					onZoomChange={setZoom}
					onCropComplete={onCropComplete}
				/>
			</div>

			<div className="mt-4 flex flex-col gap-2">
				<label className="text-sm font-medium" htmlFor="Zoom">
					Zoom
				</label>

				<input
					type="range"
					className="accent-primary"
					min={1}
					max={3}
					step={0.1}
					value={zoom}
					onChange={(e) => setZoom(Number(e.target.value))}
				/>
			</div>
		</Modal>
	);
};

export default ImageCropModal;
