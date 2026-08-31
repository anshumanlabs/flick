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
            <div className="text-5xl mb-4">🎬</div>

            <h1 className="text-2xl font-bold text-white mb-3">Movie Not Found</h1>

            <p className="text-gray-400 max-w-md mb-6">
                We couldn't find any movies matching your filters. Try changing your filters and search again.
            </p>

            <button
                onClick={() => resetFilter()}
                className="px-3 py-2 rounded-lg bg-[#49c916] text-black font-semibold
                   hover:bg-[#3eae12] transition-colors"
            >
                Reset Filter
            </button>
        </div>
    );
}
