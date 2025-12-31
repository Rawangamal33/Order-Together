import type { CredentialsType, InitialStateProps } from '@/types/auth.types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: InitialStateProps = {
  accessToken: null,
  refreshToken: null,
  user: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    avatrUrl: null,
    role: [],
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<CredentialsType>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
    logoutRedux: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        avatrUrl: null,
        role: [],
      };
    },
  },
});

export const { setCredentials, logoutRedux } = authSlice.actions;
export default authSlice.reducer;
