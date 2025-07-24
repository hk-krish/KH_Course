import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Url_Keys } from "../../Constant";
import { Get } from "../../Api";
import { CategoryApiResponse, CategorySliceType, CategoryType } from "../../Types/Category";
import { FetchApiParams } from "../../Types/CoreComponents";

const initialState: CategorySliceType = {
  isCategoryModal: false,
  allCategory: null,
  isLoadingCategory: true,
  singleEditingIdCategory: null,
  singleCategoryData: null,
};

export const fetchCategoryApiData = createAsyncThunk<CategoryApiResponse, FetchApiParams>("admin/Category", async ({ page, limit, search }) => {
  let url = Url_Keys.Category.Category;
  if (page) url += `?page=${page}&limit=${limit}`;
  if (search) url += `&search=${search}`;
  const response = await Get<CategoryApiResponse>(url);
  return response?.data;
});

export const fetchSingleCategoryApiData = createAsyncThunk<CategoryType, FetchApiParams>("admin/single-Category", async ({ id }) => {
  const response = await Get<CategoryType>(`${Url_Keys.Category.Category}/${id}`);
  return response?.data;
});

const CategorySlice = createSlice({
  name: "Category",
  initialState,
  reducers: {
    setCategoryModal: (state) => {
      state.isCategoryModal = !state.isCategoryModal;
    },
    setSingleEditingIdCategory(state, action) {
      state.singleEditingIdCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategoryApiData.fulfilled, (state, action) => {
      state.allCategory = action.payload;
      state.isLoadingCategory = false;
    });
    builder.addCase(fetchSingleCategoryApiData.fulfilled, (state, action) => {
      state.singleCategoryData = action.payload;
    });
  },
});

export const { setCategoryModal, setSingleEditingIdCategory } = CategorySlice.actions;
export default CategorySlice.reducer;
