import { combineReducers } from "redux";
import LoginReducer from "./authSlice"; // Đường dẫn đúng đến file

const rootReducer = combineReducers({
  login: LoginReducer, // Tên này quan trọng!
});

export default rootReducer;