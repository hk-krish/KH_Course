import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("hk-course-admin-user")) || {},
    isAuthenticated: Boolean(localStorage.getItem("hk-course-admin-token")),
    isEmailOtp: JSON.parse(localStorage.getItem("hk-course-admin-otp-email")) || {},
  },
  reducers: {
    login(state, action) {
      localStorage.setItem("hk-course-admin-user", JSON.stringify(action.payload));
      localStorage.setItem("hk-course-admin-token", JSON.stringify(action.payload.token));
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      localStorage.removeItem("hk-course-admin-user");
      localStorage.removeItem("hk-course-admin-token");
      state.user = null;
      state.isAuthenticated = true;
      state.isAuthenticated = false;
    },
    setEmailOtp(state, action) {
      localStorage.setItem("hk-course-admin-otp-email", JSON.stringify(action.payload));
      state.isEmailOtp = action.payload;
    },
  },
});

export const { login, logout ,setEmailOtp} = AuthSlice.actions;
export default AuthSlice.reducer;
