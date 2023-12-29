import React from "react";
import { Link } from "react-router-dom";
import defaultImage from "../assets/defaultSong.png";

import PlayPause from "./PlayPause";

const SongBar = ({
  song,
  index,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div
    className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
      activeSong?.title === song?.title ? "bg-[#4c426e]" : "bg-transparent"
    } py-2 p-4 rounded-lg cursor-pointer mb-2`}
  >
    <h3 className="font-bold text-base text-white mr-3">{index + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg"
        src={
          artistId
            ? song?.artist?.picture_medium
                .replace("{w}", "125")
                .replace("{h}", "125")
            : song?.album?.cover_big || defaultImage
        }
        alt={song?.title}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        {!artistId ? (
          <Link to={`/song/${song.id}`}>
            <p className="text-xl font-bold text-white">{song?.title}</p>
          </Link>
        ) : (
          <p className="text-xl font-bold text-white">{song?.title}</p>
        )}
        <p className="text-base text-gray-300 mt-1">{song?.album?.title}</p>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={() => handlePlayClick(song, index)}
    />
  </div>
);

export default SongBar;
