import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { topChartsId } from "../../constants";

const apiKey = import.meta.env.VITE_RAPID_API_KEY;

export const deezerApi = createApi({
  reducerPath: "deezerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://deezerdevs-deezer.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", apiKey);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => `/playlist/${topChartsId}` }),
    getSongDetails: builder.query({
      query: ({ songid }) => `/track/${songid}`,
    }),
    getArtistDetails: builder.query({
      query: ({ artistId }) => `/artist/${artistId}`,
    }),
    getSongRelated: builder.query({
      query: (albumid) => `/album/${albumid}`,
    }),
    getSongsBySearchTerm: builder.query({
      query: (searchTerm) => `/search?q=${searchTerm}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsBySearchTermQuery,
} = deezerApi;
