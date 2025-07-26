import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Url_Keys } from "../../Constant";
import { Get } from "../../Api";
import { StudentsApiResponse, StudentsSliceType, StudentsType } from "../../Types/Students";
import { FetchApiParams } from "../../Types/CoreComponents";

const initialState: StudentsSliceType = {
  isStudentsModal: false,
  allStudents: null,
  isLoadingStudents: true,
  singleEditingIdStudents: null,
  singleStudentsData: null,
};

export const fetchStudentsApiData = createAsyncThunk<StudentsApiResponse, FetchApiParams>("admin/Students", async ({ page, limit, search, blockFilter }) => {
  let url = Url_Keys.Students.Students;
  if (page) url += `?page=${page}&limit=${limit}`;
  if (search) url += `&search=${search}`;
  if (blockFilter) url += `&blockFilter=${blockFilter}`;
  const response = await Get<StudentsApiResponse>(url);
  return response?.data;
});

export const fetchSingleStudentsApiData = createAsyncThunk<StudentsType, FetchApiParams>("admin/single-Students", async ({ id }) => {
  const response = await Get<StudentsType>(`${Url_Keys.Students.Students}/${id}`);
  return response?.data;
});

const StudentsSlice = createSlice({
  name: "Students",
  initialState,
  reducers: {
    setStudentsModal: (state) => {
      state.isStudentsModal = !state.isStudentsModal;
    },
    setSingleEditingIdStudents(state, action) {
      state.singleEditingIdStudents = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudentsApiData.fulfilled, (state, action) => {
      state.allStudents = action.payload;
      state.isLoadingStudents = false;
    });
    builder.addCase(fetchSingleStudentsApiData.fulfilled, (state, action) => {
      state.singleStudentsData = action.payload;
    });
  },
});

export const { setStudentsModal, setSingleEditingIdStudents } = StudentsSlice.actions;
export default StudentsSlice.reducer;
