import { createSlice } from '@reduxjs/toolkit';


const initialState ={
  isLoggedIn: false,
  id: null,
  user: null, // Lưu thông tin user (username, email, etc.)
  token: null, // Lưu token}
}
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;