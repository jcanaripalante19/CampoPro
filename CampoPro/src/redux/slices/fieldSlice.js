import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fields: [],
  selectedField: null,
  loading: false,
  error: null,
};

const fieldSlice = createSlice({
  name: 'field',
  initialState,
  reducers: {
    setFieldLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFields: (state, action) => {
      state.fields = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedField: (state, action) => {
      state.selectedField = action.payload;
    },
    setFieldError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearFields: (state) => {
      state.fields = [];
      state.selectedField = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setFieldLoading,
  setFields,
  setSelectedField,
  setFieldError,
  clearFields,
} = fieldSlice.actions;

export default fieldSlice.reducer;