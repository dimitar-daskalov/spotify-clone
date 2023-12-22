import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import {
  useGetArtistDetailsQuery,
  useGetArtistRelatedSongsQuery,
} from "../redux/services/shazam";

const ArtistDetails = () => {
  const { id: artistId } = useParams();
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
  } = useGetArtistRelatedSongsQuery({ artistId });

  if (isArtistDataFetching || isArtistRelatedSongsDataFetching) {
    return <Loader title="Searching for artist details" />;
  }

  if (isArtistDataError || isArtistRelatedSongsError) return <Error />;

  const transformedArtistData = Object.values(artistData)[0][0].attributes;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={transformedArtistData} />
      <RelatedSongs
        data={artistRelatedSongsData}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
