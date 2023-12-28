import { Link } from "react-router-dom";
import { transformSecondsToMinutes } from "../helpers";
import defaultImage from "../assets/defaultSong.png";

const DetailsHeader = ({ artistId, artistData, songData }) => (
  <div className="relative w-full flex flex-col">
    <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />

    <div className="absolute inset-0 flex items-center">
      <img
        src={
          artistId
            ? artistData.picture_big.replace("{w}", "500").replace("{h}", "500")
            : songData?.album.cover_big || defaultImage
        }
        alt="art"
        className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
      />
      <div className="ml-5">
        <p className="font-bold sm:text-3xl text-xl text-white">
          {artistId ? artistData.name : songData?.title}
        </p>
        {!artistId && (
          <Link to={`/artist/${artistId}`}>
            <p className="text-base text-gray-400 mt-2">
              {songData?.artist.name}
            </p>
          </Link>
        )}
        <p className="text-base text-gray-400 mt-2">
          {artistId ? (
            <span>Number of Albums: {artistData.nb_album}</span>
          ) : (
            <span>
              Song Duration: {transformSecondsToMinutes(songData?.duration)}
            </span>
          )}
        </p>
      </div>
    </div>
    <div className="w-full sm:h-44 h-24" />
  </div>
);

export default DetailsHeader;
