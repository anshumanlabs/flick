import { useSearchParams } from 'react-router-dom';

export default function RecordNotFound() {
    const [, setSearchParams] = useSearchParams();

    function resetFilter() {
        setSearchParams({
            page: '1',
        });
    }

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <div className="relative mb-8">
                <div className="text-7xl mb-2">🎬</div>
                <div className="absolute inset-0 blur-2xl opacity-30 bg-brand/40 rounded-full" />
            </div>

            <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
                Movie Not Found
            </h1>

            <p className="text-text-secondary max-w-md mb-8 leading-relaxed">
                We couldn't find any movies matching your filters. Try changing your filters and search again.
            </p>

            <button
                onClick={() => resetFilter()}
                className="group relative px-8 py-3.5 rounded-xl bg-brand text-black font-bold text-sm
                   transition-all duration-300
                   hover:bg-brand-light hover:shadow-xl hover:shadow-brand/30
                   active:scale-95 overflow-hidden"
            >
                <span className="relative z-10 flex items-center gap-2">
                    Reset Filter
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-light to-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
        </div>
    );
}
