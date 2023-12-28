import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/deezer";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: songData,
    isFetching: isFetchingSongData,
    error: songDataError,
  } = useGetSongDetailsQuery({ songid });

  const albumId = songData?.album?.id;

  const {
    data: relatedSongsData,
    isFetching: isFetchingRelatedSongsData,
    error: relatedSongsDataError,
  } = useGetSongRelatedQuery(albumId, { skip: !albumId });

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
        <h2 className="text-white text-3xl font-bold">Album:</h2>
        <div className="text-base text-gray-400 mt-5">
          {songData?.album?.title}
        </div>
      </div>
      <RelatedSongs
        data={relatedSongsData}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
