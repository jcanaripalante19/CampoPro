import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  payments: [],
  selectedPayment: null,
  loading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPayments: (state, action) => {
      state.payments = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedPayment: (state, action) => {
      state.selectedPayment = action.payload;
    },
    setPaymentError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearPayments: (state) => {
      state.payments = [];
      state.selectedPayment = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setPaymentLoading,
  setPayments,
  setSelectedPayment,
  setPaymentError,
  clearPayments,
} = paymentSlice.actions;

export default paymentSlice.reducer;