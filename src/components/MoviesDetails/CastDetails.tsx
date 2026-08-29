import type { Cast } from '../../types/cast';

function CastDetails({ cast }: { cast: Cast }) {
    const BASE_IMG_URL = 'https://img.yts.gg/assets/images/actors/thumb/';

    function getActorFolder(url: string): string {
        if (url) return BASE_IMG_URL + url.split('/').at(-1);
        return BASE_IMG_URL + 'default_avatar.jpg';
    }
    return (
        <div className="cast-card flex flex-col items-center">
            <img
                src={getActorFolder(cast.url_small_image)}
                className="cast-image w-24 h-24 rounded-full object-cover mb-3 contrast-110
                saturate-110 border-2 border-transparent hover:border-brand/40
                transition-all duration-300"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                    e.currentTarget.src =
                        'https://placehold.co/300x450/111111/aaaaaa?text=FAILED%20TO%20LOAD';
                }}
            />
            <div className="flex flex-col items-center justify-center text-center">
                <h3 className="text-base font-semibold text-white transition-colors duration-200 hover:text-brand">
                    {cast.name}
                </h3>
                <p className="text-sm text-text-muted mt-0.5">{cast.character_name}</p>
            </div>
        </div>
    );
}

export default CastDetails;
