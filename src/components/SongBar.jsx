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
      activeSong?.title === song?.attributes?.title ||
      activeSong?.title === song?.attributes?.name
        ? "bg-[#4c426e]"
        : "bg-transparent"
    } py-2 p-4 rounded-lg cursor-pointer mb-2`}
  >
    <h3 className="font-bold text-base text-white mr-3">{index + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg"
        src={
          artistId
            ? song?.attributes?.images?.artistAvatar ||
              song?.attributes?.artwork?.url
                .replace("{w}", "125")
                .replace("{h}", "125")
            : song?.attributes?.images?.coverArt || defaultImage
        }
        alt={song?.attributes?.title || song?.attributes?.name}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        {!artistId ? (
          <Link to={`/songs/${song.id}`}>
            <p className="text-xl font-bold text-white">
              {song?.attributes?.title}
            </p>
          </Link>
        ) : (
          <p className="text-xl font-bold text-white">
            {song?.attributes?.artist || song?.attributes?.name}
          </p>
        )}
        <p className="text-base text-gray-300 mt-1">
          {song?.attributes?.genres?.primary ||
            song?.attributes?.artist ||
            song?.attributes?.genreNames[0]}
        </p>
      </div>
    </div>
    {!artistId ? (
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={() => handlePlayClick(song, index)}
      />
    ) : null}
  </div>
);

export default SongBar;
