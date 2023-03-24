import {createSlice} from '@reduxjs/toolkit';

const moviesSlice = createSlice({
  name: 'movies',

  initialState: {
    data: {},
  },
  reducers: {},
});

export const moviesReducer = moviesSlice.reducer;
