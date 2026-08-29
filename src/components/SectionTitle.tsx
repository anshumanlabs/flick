interface SectionTitleProps {
    title: string;
    index?: number;
}

function SectionTitle({ title, index }: SectionTitleProps) {
    return (
        <div className="relative flex items-center overflow-hidden group cursor-default">
            {index && (
                <span className="mr-3 text-5xl font-black leading-none text-white/40 select-none transition-all duration-300 group-hover:text-white/70">
                    {String(index).padStart(2, '0')}
                </span>
            )}
            <div className="relative">
                <h2 className="text-xl font-bold text-white sm:text-2xl transition-all duration-300 group-hover:text-brand">
                    {title}
                </h2>
                <div className="mt-2 h-[3px] w-12 rounded-full bg-brand transition-all duration-500 group-hover:w-20" />
            </div>
        </div>
    );
}

export default SectionTitle;
