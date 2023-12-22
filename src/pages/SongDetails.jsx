import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/shazam";
import { haveObjectData } from "../helpers";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: songData,
    isFeching: isFetchingSongData,
    error: songDataError,
  } = useGetSongDetailsQuery({ songid });
  const {
    data: relatedSongsData,
    isFeching: isFetchingRelatedSongsData,
    error: relatedSongsDataError,
  } = useGetSongRelatedQuery({ songid });

  const lyricsData = songData?.resources?.lyrics;
  const relatedSongs = relatedSongsData?.resources["shazam-songs"] || [];

  const lyrics = haveObjectData(lyricsData)
    ? Object.values(lyricsData)[0].attributes.text
    : [];

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, index) => {
    dispatch(setActiveSong({ song, relatedSongsData, index }));
    dispatch(playPause(true));
  };

  if (isFetchingSongData || isFetchingRelatedSongsData) {
    return <Loader title="Searching for song details" />;
  }

  if (songDataError || relatedSongsDataError) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {/* TODO: - fix this check so it does not show not found the time it loads */}
          {lyrics.length ? (
            lyrics.map((line, index) => (
              <p className="text-gray-400 text-base my-1" key={index}>
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, no lyrics found!
            </p>
          )}
        </div>
      </div>
      <RelatedSongs
        data={relatedSongs}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
