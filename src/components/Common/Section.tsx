type SectionProps = {
	children: React.ReactNode;
};

const Section = ({ children }: SectionProps) => {
	return (
		<section>
			<div className="w-full">{children}</div>
		</section>
	);
};

export default Section;
