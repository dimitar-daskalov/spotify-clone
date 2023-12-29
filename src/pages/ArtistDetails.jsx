import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";

import {
  useGetArtistDetailsQuery,
  useGetSongsBySearchTermQuery,
} from "../redux/services/deezer";

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: artistData,
    isFetching: isArtistDataFetching,
    error: isArtistDataError,
  } = useGetArtistDetailsQuery({ artistId });

  const {
    data: artistRelatedSongsData,
    isFetching: isArtistRelatedSongsDataFetching,
    error: isArtistRelatedSongsError,
  } = useGetSongsBySearchTermQuery(artistData?.name, {
    skip: !artistData?.name,
  });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, index) => {
    dispatch(setActiveSong({ song, artistRelatedSongsData, index }));
    dispatch(playPause(true));
  };

  if (isArtistDataFetching || isArtistRelatedSongsDataFetching) {
    return <Loader title="Searching for artist details" />;
  }

  if (isArtistDataError || isArtistRelatedSongsError) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />
      <RelatedSongs
        data={artistRelatedSongsData}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default ArtistDetails;
