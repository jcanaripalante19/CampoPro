import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reservations: [],
  selectedReservation: null,
  draftReservation: null,
  loading: false,
  error: null,
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setReservationLoading: (state, action) => {
      state.loading = action.payload;
    },
    setReservations: (state, action) => {
      state.reservations = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedReservation: (state, action) => {
      state.selectedReservation = action.payload;
    },
    setDraftReservation: (state, action) => {
      state.draftReservation = action.payload;
    },
    setReservationError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearReservations: (state) => {
      state.reservations = [];
      state.selectedReservation = null;
      state.draftReservation = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setReservationLoading,
  setReservations,
  setSelectedReservation,
  setDraftReservation,
  setReservationError,
  clearReservations,
} = reservationSlice.actions;

export default reservationSlice.reducer;