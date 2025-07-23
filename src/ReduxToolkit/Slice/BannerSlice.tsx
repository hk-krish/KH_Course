import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Url_Keys } from "../../Constant";
import { Get } from "../../Api";
import { BannerApiResponse, BannersSliceType, BannerType } from "../../Types/Banner";
import { FetchApiParams } from "../../Types/CoreComponents";

const initialState: BannersSliceType = {
  isBannerModal: false,
  allBanner: null,
  isLoadingBanner: true,
  isBannerSearchData: null,
  singleEditingIdBanner: null,
  singleBannerData: null,
};

export const fetchBannerApiData = createAsyncThunk<BannerApiResponse, FetchApiParams>("admin/banner", async ({ page, limit, search }) => {
  let url = Url_Keys.Banner.Banner;
  if (page) url += `?page=${page}&limit=${limit}`;
  if (search) url += `&search=${search}`;
  const response = await Get<BannerApiResponse>(url);
  return response?.data;
});

export const fetchSingleBannerApiData = createAsyncThunk<BannerType, FetchApiParams>("admin/single-banner", async ({ id }) => {
  const response = await Get<BannerType>(`${Url_Keys.Banner.Single}/${id}`);
  return response?.data;
});

const BannersSlice = createSlice({
  name: "Banners",
  initialState,
  reducers: {
    setBannerModal: (state) => {
      state.isBannerModal = !state.isBannerModal;
    },
    setSingleEditingIdBanner(state, action) {
      state.singleEditingIdBanner = action.payload;
    },
    setBannerSearchData(state, action) {
      state.isBannerSearchData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBannerApiData.fulfilled, (state, action) => {
      state.allBanner = action.payload;
      state.isLoadingBanner = false;
    });
    builder.addCase(fetchSingleBannerApiData.fulfilled, (state, action) => {
      state.singleBannerData = action.payload;
    });
  },
});

export const { setBannerModal, setSingleEditingIdBanner, setBannerSearchData } = BannersSlice.actions;
export default BannersSlice.reducer;
