import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const moviesApi = createApi({
  reducerPath: 'movies',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
  }),
  endpoints(builder) {
    return {
      fetchMovies: builder.query({
        query: movieTitle => {
          return {
            url: 'search/movie',
            params: {
              api_key: '2bbd57f990d7d2db338ad5a626a2cb69',
              query: movieTitle,
            },
            method: 'GET',
          };
        },
      }),
      fetchMovie: builder.query({
        query: id => {
          return {
            url: `movie/${id}`,
            params: {
              api_key: '2bbd57f990d7d2db338ad5a626a2cb69',
            },
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const {useFetchMoviesQuery, useFetchMovieQuery} = moviesApi;
export {moviesApi};
