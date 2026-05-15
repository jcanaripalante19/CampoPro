import { createSlice } from '@reduxjs/toolkit';
import roles from '../../constants/roles';

const initialState = {
  activeRole: roles.CLIENT,
  availableRoles: [roles.CLIENT],
  activeBusinessId: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setActiveRole: (state, action) => {
      state.activeRole = action.payload;
    },
    setAvailableRoles: (state, action) => {
      state.availableRoles = action.payload;
    },
    setActiveBusinessId: (state, action) => {
      state.activeBusinessId = action.payload;
    },
    clearProfile: (state) => {
      state.activeRole = roles.CLIENT;
      state.availableRoles = [roles.CLIENT];
      state.activeBusinessId = null;
    },
  },
});

export const {
  setActiveRole,
  setAvailableRoles,
  setActiveBusinessId,
  clearProfile,
} = profileSlice.actions;

export default profileSlice.reducer;