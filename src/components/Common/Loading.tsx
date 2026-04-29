type LoadingProps = {
	loadingText: string;
	size?: number;
	className?: string;
};

const Loading = ({
	loadingText = "Cargando...",
	size = 100,
	className = "",
}: LoadingProps) => {
	return (
		<output
			className={`flex flex-col items-center justify-center gap-3 ${className}`}
			aria-live="polite"
		>
			<svg
				role="img"
				aria-labelledby="loading-title"
				width={size}
				height={size}
				viewBox="0 0 120 40"
				fill="currentColor"
				className="text-primary"
			>
				<title id="loading-title">Indicador de carga</title>
				<circle cx="20" cy="20" r="6">
					<animate
						attributeName="cy"
						values="20;8;20"
						dur="0.8s"
						repeatCount="indefinite"
						begin="0s"
					/>
				</circle>
				<circle cx="60" cy="20" r="6">
					<animate
						attributeName="cy"
						values="20;8;20"
						dur="0.8s"
						repeatCount="indefinite"
						begin="0.15s"
					/>
				</circle>
				<circle cx="100" cy="20" r="6">
					<animate
						attributeName="cy"
						values="20;8;20"
						dur="0.8s"
						repeatCount="indefinite"
						begin="0.3s"
					/>
				</circle>
			</svg>
			<span className="text-lg text-neutral-500">{loadingText}</span>
		</output>
	);
};

export default Loading;
