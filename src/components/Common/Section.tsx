type SectionProps = {
	children: React.ReactNode;
};

const Section = ({ children }: SectionProps) => {
	return (
		<section className="p-6">
			<div className="w-full flex flex-col gap-6">{children}</div>
		</section>
	);
};

export default Section;
