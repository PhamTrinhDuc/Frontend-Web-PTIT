import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import authReducer from '../slices/authSlice';
import cartReducer from '../slices/cartSlice';

// Cấu hình persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart'], // Persist cả auth và cart
};

// Kết hợp các reducer
const rootReducer = combineReducers({
  auth: authReducer, // Key là 'auth'
  cart: cartReducer, // Key là 'cart'
});

// Áp dụng persist cho rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;