import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {moviesApi} from './api/moviesApi';

const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(moviesApi.middleware);
  },
});
setupListeners(store.dispatch);

export {store};
export type RootState = ReturnType<typeof store.getState>;
export {useFetchMoviesQuery, useFetchMovieQuery} from './api/moviesApi';
