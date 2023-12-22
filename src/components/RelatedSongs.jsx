import SongBar from "./SongBar";

const RelatedSongs = ({
  data,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
  artistId,
}) => {
  let transformedData = Object.values(data);

  if (transformedData.length === 1) {
    transformedData = transformedData.flat();
  }

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">Related Songs:</h1>

      <div className="flex flex-col w-full mt-6">
        {/* TODO: - fix the songs player for the song bar */}
        {transformedData?.map((song, index) => (
          <SongBar
            key={`${song.id}-${artistId}`}
            song={song}
            index={index}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
