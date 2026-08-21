interface SectionTitleProps {
    title: string;
    index?: number;
}

function SectionTitle({ title, index }: SectionTitleProps) {
    return (
        <div className="relative flex items-center overflow-hidden">
            {index && (
                <span className="mr-3 text-5xl font-black leading-none text-white/60">
                    {String(index).padStart(2, '0')}
                </span>
            )}
            <div className="relative">
                <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>

                <div className="mt-2 h-0.5 w-12 rounded-full bg-[#49c916]" />
            </div>
        </div>
    );
}

export default SectionTitle;
