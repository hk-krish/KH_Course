import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Url_Keys } from "../../Constant";
import { Get } from "../../Api";
import { CourseApiResponse, CourseSliceType, CourseType } from "../../Types/Course";
import { FetchApiParams } from "../../Types/CoreComponents";

const initialState: CourseSliceType = {
  isCourseModal: false,
  allCourse: null,
  isLoadingCourse: true,
  singleEditingIdCourse: null,
  singleCourseData: null,
};

export const fetchCourseApiData = createAsyncThunk<CourseApiResponse, FetchApiParams>("admin/course", async ({ page, limit, search }) => {
  let url = Url_Keys.Course.Course;
  if (page) url += `?page=${page}&limit=${limit}`;
  if (search) url += `&search=${search}`;
  const response = await Get<CourseApiResponse>(url);
  return response?.data;
});

export const fetchSingleCourseApiData = createAsyncThunk<CourseType, FetchApiParams>("admin/single-course", async ({ id }) => {
  const response = await Get<CourseType>(`${Url_Keys.Course.Course}/${id}`);
  return response?.data;
});

const CourseSlice = createSlice({
  name: "Course",
  initialState,
  reducers: {
    setCourseModal: (state) => {
      state.isCourseModal = !state.isCourseModal;
    },
    setSingleEditingIdCourse(state, action) {
      state.singleEditingIdCourse = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourseApiData.fulfilled, (state, action) => {
      state.allCourse = action.payload;
      state.isLoadingCourse = false;
    });
    builder.addCase(fetchSingleCourseApiData.fulfilled, (state, action) => {
      state.singleCourseData = action.payload;
    });
  },
});

export const { setCourseModal, setSingleEditingIdCourse } = CourseSlice.actions;
export default CourseSlice.reducer;
