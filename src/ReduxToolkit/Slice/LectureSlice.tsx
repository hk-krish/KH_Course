import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Url_Keys } from "../../Constant";
import { Get } from "../../Api";
import { LectureApiResponse, LectureSliceType, LectureType } from "../../Types/Lecture";
import { FetchApiParams } from "../../Types/CoreComponents";

const initialState: LectureSliceType = {
  isLectureModal: false,
  allLecture: null,
  isLoadingLecture: true,
  singleEditingIdLecture: null,
  singleLectureData: null,
  singleCourseId: JSON.parse(localStorage.getItem("HK-Course-Admin-Course-Id")) || "",
};

export const fetchLectureApiData = createAsyncThunk<LectureApiResponse, FetchApiParams>("admin/Lecture", async ({ page, limit, search, courseFilter }) => {
  let url = Url_Keys.Lecture.Lecture;
  if (page) url += `?page=${page}&limit=${limit}`;
  if (search) url += `&search=${search}`;
  if (courseFilter) url += `&courseFilter=${courseFilter}`;
  const response = await Get<LectureApiResponse>(url);
  return response?.data;
});

export const fetchSingleLectureApiData = createAsyncThunk<LectureType, FetchApiParams>("admin/single-Lecture", async ({ id }) => {
  const response = await Get<LectureType>(`${Url_Keys.Lecture.Lecture}/${id}`);
  return response?.data;
});

const LectureSlice = createSlice({
  name: "Lecture",
  initialState,
  reducers: {
    setLectureModal: (state) => {
      state.isLectureModal = !state.isLectureModal;
    },
    setSingleEditingIdLecture(state, action) {
      state.singleEditingIdLecture = action.payload;
    },
    setSingleCourseId(state, action) {
      state.singleCourseId = action.payload;
      localStorage.setItem("HK-Course-Admin-Course-Id", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLectureApiData.fulfilled, (state, action) => {
      state.allLecture = action.payload;
      state.isLoadingLecture = false;
    });
    builder.addCase(fetchSingleLectureApiData.fulfilled, (state, action) => {
      state.singleLectureData = action.payload;
    });
  },
});

export const { setLectureModal, setSingleEditingIdLecture, setSingleCourseId } = LectureSlice.actions;
export default LectureSlice.reducer;
