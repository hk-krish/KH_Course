import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slice/AuthSlice";
import LayoutSlice from "./Slice/LayoutSlice";
import BannerSlice from "./Slice/BannerSlice";
import CategorySlice from "./Slice/CategorySlice";
import CourseSlice from "./Slice/CourseSlice";
import StudentsSlice from "./Slice/StudentsSlice";
import LectureSlice from "./Slice/LectureSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    layout: LayoutSlice,
    banner: BannerSlice,
    category: CategorySlice,
    course: CourseSlice,
    students: StudentsSlice,
    lecture: LectureSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
