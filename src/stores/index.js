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
import reviewReducer from '../slices/reviewSlice';

// Cấu hình persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart', 'reviews'], // Persist cả auth, cart và reviews
};

// Kết hợp các reducer
const rootReducer = combineReducers({
  auth: authReducer, // Key là 'auth'
  cart: cartReducer, // Key là 'cart'
  reviews: reviewReducer, // Key là 'reviews'
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