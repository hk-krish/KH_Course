import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  responsiveSearch: false,
  sideBarToggle: false,
};

const LayoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setResponsiveSearch: (state) => {
      state.responsiveSearch = !state.responsiveSearch;
    },
    setSideBarToggle: (state, action) => {
      state.sideBarToggle = action.payload;
    },
    toggleSidebar: (state) => {
      state.sideBarToggle = !state.sideBarToggle;
    },
  },
});

export const { setResponsiveSearch, toggleSidebar, setSideBarToggle } = LayoutSlice.actions;
export default LayoutSlice.reducer;
