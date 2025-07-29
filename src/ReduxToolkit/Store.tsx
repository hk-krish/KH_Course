import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slice/AuthSlice";
import LayoutSlice from "./Slice/LayoutSlice";
import BannerSlice from "./Slice/BannerSlice";
import CategorySlice from "./Slice/CategorySlice";
import CourseSlice from "./Slice/CourseSlice";
import StudentsSlice from "./Slice/StudentsSlice";
import LectureSlice from "./Slice/LectureSlice";
import DocumentSlice from "./Slice/DocumentSlice";
import FaqSlice from "./Slice/FaqSlice";
import BlogSlice from "./Slice/BlogSlice";
import LatestNewsSlice from "./Slice/LatestNewsSlice";
import ChatSlice from "./Slice/ChatSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    layout: LayoutSlice,
    banner: BannerSlice,
    category: CategorySlice,
    course: CourseSlice,
    students: StudentsSlice,
    lecture: LectureSlice,
    document: DocumentSlice,
    faq: FaqSlice,
    blog: BlogSlice,
    latestNews: LatestNewsSlice,
    chat: ChatSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
