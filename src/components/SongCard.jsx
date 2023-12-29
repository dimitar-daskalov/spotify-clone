import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";
import { usePlayPause } from "../hooks";

const SongCard = ({ song, isPlaying, activeSong, index, data }) => {
  const { handlePauseClick, handlePlayClick } = usePlayPause();

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === song.title
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={() => handlePlayClick(song, data, index)}
          />
        </div>
        <img alt="cover" src={song.album.cover_big} />
      </div>
      <div className="flex flex-col mt-4">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/song/${song.id}`}>{song.title}</Link>
        </p>
        <p className="text-sm text-gray-300 truncate mt-1">
          <Link to={song.artist ? `/artist/${song.artist.id}` : "/top-artists"}>
            {song.artist.name}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
