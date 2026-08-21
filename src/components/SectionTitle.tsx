interface SectionTitleProps {
    title: string;
}

function SectionTitle({ title }: SectionTitleProps) {
    return (
        <div className="flex items-center gap-3">
            <div className="h-6 w-1 rounded-full bg-[#49c916]" />
            <h2 className="text-sm sm:text-xl lg:text-xl font-bold text-white">{title}</h2>
        </div>
    );
}

export default SectionTitle;
