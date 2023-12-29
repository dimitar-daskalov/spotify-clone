import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { shuffleArray } from "../helpers";

import { useGetTopChartsQuery } from "../redux/services/deezer";

const Discover = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();

  const shuffledData = shuffleArray(data?.tracks?.data || []);

  if (isFetching) {
    return <Loader title="Loading songs..." />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover tracks
        </h2>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {shuffledData.map((song, index) => (
          <SongCard
            key={song.id}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
