import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import {
  useGetArtistDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/deezer";

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: artistData,
    isFetching: isArtistDataFetching,
    error: isArtistDataError,
  } = useGetArtistDetailsQuery({ artistId });

  const albumId = artistData;
  const {
    data: artistRelatedSongsData,
    isFetching: isArtistRelatedSongsDataFetching,
    error: isArtistRelatedSongsError,
  } = useGetSongRelatedQuery(albumId, { skip: !albumId });

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
      />
    </div>
  );
};

export default ArtistDetails;
