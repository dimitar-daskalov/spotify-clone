import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { usePlayPause } from "../hooks";

import {
  useGetArtistDetailsQuery,
  useGetSongsBySearchTermQuery,
} from "../redux/services/deezer";

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: artistData,
    isFetching: isArtistDataFetching,
    error: isArtistDataError,
  } = useGetArtistDetailsQuery({ artistId });
  const { handlePauseClick, handlePlayClick } = usePlayPause();

  const {
    data: artistRelatedSongsData,
    isFetching: isArtistRelatedSongsDataFetching,
    error: isArtistRelatedSongsError,
  } = useGetSongsBySearchTermQuery(artistData?.name, {
    skip: !artistData?.name,
  });

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
