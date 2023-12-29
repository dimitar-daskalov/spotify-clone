import { Link } from "react-router-dom";
import defaultImage from "../assets/defaultSong.png";

const ArtistCard = ({ track }) => (
  <Link
    className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
    to={`/artist/${track?.artist?.id}`}
  >
    <>
      <img
        src={track?.album?.cover_big || defaultImage}
        alt="artist"
        className="w-full h-56 rounded-lg"
      />
      <p className="mt-4 font-semibold text-lg text-white truncate">
        {track?.artist?.name}
      </p>
    </>
  </Link>
);

export default ArtistCard;
