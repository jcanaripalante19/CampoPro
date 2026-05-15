import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import businessReducer from './slices/businessSlice';
import venueReducer from './slices/venueSlice';
import fieldReducer from './slices/fieldSlice';
import reservationReducer from './slices/reservationSlice';
import paymentReducer from './slices/paymentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    business: businessReducer,
    venue: venueReducer,
    field: fieldReducer,
    reservation: reservationReducer,
    payment: paymentReducer,
  },
});

export default store;