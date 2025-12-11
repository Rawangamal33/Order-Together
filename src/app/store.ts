import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from '../features/auth/authSlice';
import { api } from '@/services/api/api';
import { setupListeners } from '@reduxjs/toolkit/query';
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
