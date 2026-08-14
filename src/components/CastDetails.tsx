import type { Cast } from "../types/cast";

function CastDetails({ cast }: { cast: Cast }) {
  const BASE_IMG_URL = "https://yts.gg/assets/images/actors/thumb/";

  function getActorFolder(url: string): string {
    console.log("Actor URLs:", url);
    if(url)
        return BASE_IMG_URL + url.split("/").at(-1);
    return "https://via.placeholder.com/300x450?text=No+Image";
  }
  return (
    <div className="flex flex-col items-center">
      <img
        src={getActorFolder(cast.url_small_image)}
        className="w-24 h-24 rounded-full object-cover mb-2"
      />
      <h3 className="text-lg font-semibold">{cast.name}</h3>
      <p className="text-sm text-gray-600">{cast.character_name}</p>
    </div>
  );
}

export default CastDetails;
