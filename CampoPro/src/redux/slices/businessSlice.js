import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  businesses: [],
  selectedBusiness: null,
  loading: false,
  error: null,
};

const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    setBusinessLoading: (state, action) => {
      state.loading = action.payload;
    },
    setBusinesses: (state, action) => {
      state.businesses = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedBusiness: (state, action) => {
      state.selectedBusiness = action.payload;
    },
    setBusinessError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearBusinesses: (state) => {
      state.businesses = [];
      state.selectedBusiness = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setBusinessLoading,
  setBusinesses,
  setSelectedBusiness,
  setBusinessError,
  clearBusinesses,
} = businessSlice.actions;

export default businessSlice.reducer;