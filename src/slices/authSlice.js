import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

const initialState = {
  user: null,
  role: null, // Thêm role vào state
  isAuthenticated: false,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.role = action.payload.role || 'user'; // Lưu role từ payload, mặc định là 'user'
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
    logout(state) {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { login, updateUser, logout } = userSlice.actions;
export default userSlice.reducer;