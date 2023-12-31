import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import { usePlayPause } from "../hooks";
import PlayPause from "./PlayPause";
import { useGetTopChartsQuery } from "../redux/services/deezer";
import defaultImage from "../assets/defaultSong.png";

import "swiper/css";
import "swiper/css/free-mode";

const TopChartCard = ({
  song,
  index,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div className="w-full flex flex-row justify-between items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <div className="flex items-center justify-start">
      <h3 className="font-bold text-base text-white mr-3">{index + 1}.</h3>
      <div className="flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={song?.album?.cover_big || defaultImage}
          alt={song?.title}
        />
        <div className="flex-column justify-center mx-3">
          <Link to={`/song/${song.id}`}>
            <p className="font-bold text-xl text-white w-28 lg:w-48 truncate">
              {song?.title}
            </p>
          </Link>
          <Link to={`/artist/${song?.artist?.id}`}>
            <p className="text-base text-gray-300 w-28 lg:w-48 truncate">
              {song?.artist?.name}
            </p>
          </Link>
        </div>
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

const TopPlay = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);
  const { handlePauseClick, handlePlayClick } = usePlayPause();

  const topPlays = data?.tracks?.data?.slice(0, 5);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, index) => (
            <TopChartCard
              key={song.id}
              song={song}
              index={index}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song) => (
            <SwiperSlide
              key={song?.id}
              style={{ width: "25%", height: "auto" }}
              className="shadow-lg rounded-full"
            >
              <Link to={`artist/${song?.artist?.id}`}>
                <img
                  src={song?.album?.cover_big || defaultImage}
                  alt="artist"
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
