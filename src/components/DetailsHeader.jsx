import { Link } from "react-router-dom";
import { haveObjectData } from "../helpers";
import defaultImage from "../assets/defaultSong.png";

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const shazamSongData = songData?.resources["shazam-songs"];
  const artistsSongData = songData?.resources?.artists;

  const songCoverArt = haveObjectData(shazamSongData)
    ? Object.values(shazamSongData)[0].attributes?.images?.coverArt
    : undefined;

  const songName = haveObjectData(shazamSongData)
    ? Object.values(shazamSongData)[0].attributes.title
    : undefined;

  const songGenre = haveObjectData(shazamSongData)
    ? Object.values(shazamSongData)[0].attributes?.genres?.primary
    : null;

  const extractedArtistId = haveObjectData(artistsSongData)
    ? Object.values(artistsSongData)[0].id
    : null;

  const extractedArtistName = haveObjectData(artistsSongData)
    ? Object.values(artistsSongData)[0].attributes.name
    : null;

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />

      <div className="absolute inset-o flex items-center">
        <img
          src={
            artistId
              ? artistData.artwork?.url
                  .replace("{w}", "500")
                  .replace("{h}", "500")
              : songCoverArt || defaultImage
          }
          alt="art"
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
        />
        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {artistId ? artistData.name : songName}
          </p>
          {!artistId && (
            <Link to={`/artists/${extractedArtistId}`}>
              <p className="text-base text-gray-400 mt-2">
                {extractedArtistName}
              </p>
            </Link>
          )}
          <p className="text-base text-gray-400 mt-2">
            {artistId ? artistData.genreNames[0] : songGenre}
          </p>
        </div>
      </div>
      <div className="w-full sm:h-44 h-24" />
    </div>
  );
};

export default DetailsHeader;
