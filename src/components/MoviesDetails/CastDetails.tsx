import type { Cast } from '../../types/cast';

function CastDetails({ cast }: { cast: Cast }) {
    const BASE_IMG_URL = 'https://img.yts.gg/assets/images/actors/thumb/';

    function getActorFolder(url: string): string {
        if (url) return BASE_IMG_URL + url.split('/').at(-1);
        return BASE_IMG_URL + 'default_avatar.jpg';
    }
    return (
        <div className="flex flex-col items-center">
            <img
                src={getActorFolder(cast.url_small_image)}
                className="w-24 h-24 rounded-full object-cover mb-2 contrast-120
            saturate-120"
                onError={(e) => {
                    e.currentTarget.src =
                        'https://placehold.co/300x450/111111/aaaaaa?text=FAILED%20TO%20LOAD';
                }}
            />
            <div className="flex flex-col items-center justify-center text-center">
                <h3 className="text-lg font-semibold">{cast.name}</h3>
                <p className="text-sm text-gray-600">{cast.character_name}</p>
            </div>
        </div>
    );
}

export default CastDetails;
