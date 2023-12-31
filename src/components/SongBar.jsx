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
  data,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div
    className={`w-full flex flex-row items-center justify-between hover:bg-[#4c426e] ${
      activeSong?.title === song?.title ? "bg-[#4c426e]" : "bg-transparent"
    } py-2 p-4 rounded-lg cursor-pointer mb-2`}
  >
    <div className="flex items-center justify-start">
      <h3 className="font-bold text-base text-white mr-3">{index + 1}.</h3>
      <div className="flex flex-row justify-start items-center w-full">
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
        <div className="flex flex-col items-center justify-start mx-3 w-[80%]">
          {!artistId ? (
            <Link to={`/song/${song.id}`}>
              <p className="text-xl font-bold text-white self-start w-28 sm:w-48 lg:w-full truncate">
                {song?.title}
              </p>
            </Link>
          ) : (
            <p className="text-xl font-bold text-white self-start w-28 sm:w-48 lg:w-full truncate">
              {song?.title}
            </p>
          )}
          <p className="text-base text-gray-300 mt-1 self-start w-28 sm:w-48 lg:w-full truncate">
            {song?.album?.title}
          </p>
        </div>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={() => handlePlayClick(song, data, index)}
    />
  </div>
);

export default SongBar;
