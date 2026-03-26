import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false, // Thay vì isAuthenticated
    user: null,
    token: null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setCredentials(state, action) {
      if (action.payload.user) state.user = action.payload.user;
      if (action.payload.token) state.token = action.payload.token;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;