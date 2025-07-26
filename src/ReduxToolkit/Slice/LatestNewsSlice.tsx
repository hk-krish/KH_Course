import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Url_Keys } from "../../Constant";
import { Get } from "../../Api";
import { FetchApiParams } from "../../Types/CoreComponents";
import { LatestNewsApiResponse, LatestNewsSliceType, LatestNewsType } from "../../Types/LatestNews";

const initialState: LatestNewsSliceType = {
  isLatestNewsModal: false,
  allLatestNews: null,
  isLoadingLatestNews: true,
  singleEditingIdLatestNews: null,
  singleLatestNewsData: null,
};

export const fetchLatestNewsApiData = createAsyncThunk<LatestNewsApiResponse, FetchApiParams>("admin/LatestNews", async ({ page, limit, search }) => {
  let url = Url_Keys.LatestNews.LatestNews;
  if (page) url += `?page=${page}&limit=${limit}`;
  if (search) url += `&search=${search}`;
  const response = await Get<LatestNewsApiResponse>(url);
  return response?.data;
});

export const fetchSingleLatestNewsApiData = createAsyncThunk<LatestNewsType, FetchApiParams>("admin/single-LatestNews", async ({ id }) => {
  const response = await Get<LatestNewsType>(`${Url_Keys.LatestNews.LatestNews}/${id}`);
  return response?.data;
});

const LatestNewsSlice = createSlice({
  name: "LatestNews",
  initialState,
  reducers: {
    setLatestNewsModal: (state) => {
      state.isLatestNewsModal = !state.isLatestNewsModal;
    },
    setSingleEditingIdLatestNews(state, action) {
      state.singleEditingIdLatestNews = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLatestNewsApiData.fulfilled, (state, action) => {
      state.allLatestNews = action.payload;
      state.isLoadingLatestNews = false;
    });
    builder.addCase(fetchSingleLatestNewsApiData.fulfilled, (state, action) => {
      state.singleLatestNewsData = action.payload;
    });
  },
});

export const { setLatestNewsModal, setSingleEditingIdLatestNews } = LatestNewsSlice.actions;
export default LatestNewsSlice.reducer;
