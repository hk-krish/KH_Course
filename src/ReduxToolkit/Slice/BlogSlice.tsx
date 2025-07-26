import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Url_Keys } from "../../Constant";
import { Get } from "../../Api";
import { FetchApiParams } from "../../Types/CoreComponents";
import { BlogApiResponse, BlogSliceType, BlogType } from "../../Types/Blog";

const initialState: BlogSliceType = {
  isBlogModal: false,
  allBlog: null,
  isLoadingBlog: true,
  singleEditingIdBlog: null,
  singleBlogData: null,
};

export const fetchBlogApiData = createAsyncThunk<BlogApiResponse, FetchApiParams>("admin/blog", async ({ page, limit, search }) => {
  let url = Url_Keys.Blog.Blog;
  if (page) url += `?page=${page}&limit=${limit}`;
  if (search) url += `&search=${search}`;
  const response = await Get<BlogApiResponse>(url);
  return response?.data;
});

export const fetchSingleBlogApiData = createAsyncThunk<BlogType, FetchApiParams>("admin/single-Blog", async ({ id }) => {
  const response = await Get<BlogType>(`${Url_Keys.Blog.Blog}/${id}`);
  return response?.data;
});

const BlogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogModal: (state) => {
      state.isBlogModal = !state.isBlogModal;
    },
    setSingleEditingIdBlog(state, action) {
      state.singleEditingIdBlog = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlogApiData.fulfilled, (state, action) => {
      state.allBlog = action.payload;
      state.isLoadingBlog = false;
    });
    builder.addCase(fetchSingleBlogApiData.fulfilled, (state, action) => {
      state.singleBlogData = action.payload;
    });
  },
});

export const { setBlogModal, setSingleEditingIdBlog } = BlogSlice.actions;
export default BlogSlice.reducer;
