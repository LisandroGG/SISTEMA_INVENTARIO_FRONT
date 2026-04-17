type MessageProps = {
	message: string;
};

const ErrorMessage = ({ message }: MessageProps) => {
	if (!message) return null;

	return <span className="font-bold text-tertiary text-sm">{message}</span>;
};

export default ErrorMessage;
