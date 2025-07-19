import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("sahajanand-admin-user")) || {},
    isAuthenticated: Boolean(localStorage.getItem("sahajanand-admin-user")),
  },
  reducers: {
    login(state, action) {
      localStorage.setItem("sahajanand-admin-user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    logout(state) {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
