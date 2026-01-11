import type {
  CredentialsType,
  InitialStateProps,
} from '@/features/auth/types/auth.types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: InitialStateProps = {
  accessToken: null,
  refreshToken: null,
  user: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    avatarUrl: null,
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
    updateUser: (
      state,
      action: PayloadAction<{
        firstName: string;
        lastName: string;
        avatarUrl: string | null;
      }>
    ) => {
      state.user = {
        ...state.user,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        avatarUrl: action.payload.avatarUrl,
      };
    },
    logoutRedux: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        avatarUrl: null,
        role: [],
      };
    },
  },
});

export const { setCredentials, updateUser, logoutRedux } = authSlice.actions;
export default authSlice.reducer;
