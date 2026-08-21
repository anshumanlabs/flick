interface SectionTitleProps {
    title: string;
}

function SectionTitle({ title }: SectionTitleProps) {
    return (
        <div className="flex items-center gap-3 ml-5">
            <div className="h-6 w-1 rounded-full bg-[#49c916]" />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{title}</h2>
        </div>
    );
}

export default SectionTitle;
