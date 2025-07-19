import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pinedMenu: [],
  responsiveSearch: false,
  sideBarToggle: false,
};

const LayoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setPinedMenu: (state, action) => {
      state.pinedMenu = action.payload;
    },
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

export const { setPinedMenu, setResponsiveSearch, toggleSidebar, setSideBarToggle } = LayoutSlice.actions;
export default LayoutSlice.reducer;
