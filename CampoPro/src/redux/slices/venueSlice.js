import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  venues: [],
  selectedVenue: null,
  loading: false,
  error: null,
};

const venueSlice = createSlice({
  name: 'venue',
  initialState,
  reducers: {
    setVenueLoading: (state, action) => {
      state.loading = action.payload;
    },
    setVenues: (state, action) => {
      state.venues = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedVenue: (state, action) => {
      state.selectedVenue = action.payload;
    },
    setVenueError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearVenues: (state) => {
      state.venues = [];
      state.selectedVenue = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setVenueLoading,
  setVenues,
  setSelectedVenue,
  setVenueError,
  clearVenues,
} = venueSlice.actions;

export default venueSlice.reducer;