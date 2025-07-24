import { SelectOption } from "./CoreComponents";

export interface CourseType {
  _id: string;
  name: string;
  image: string;
  feature: boolean;
  action: boolean;
  locked: boolean;
  categoryType: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CourseState {
  page: number;
  limit: number;
  page_limit: number;
}

export interface CourseApiResponse {
  course_data: CourseType[];
  totalData: number;
  state: CourseState;
}

export interface CourseSliceType {
  isCourseModal: boolean;
  allCourse: CourseApiResponse;
  isLoadingCourse: boolean;
  singleEditingIdCourse: string;
  singleCourseData: CourseType;
}

export interface CourseFormData {
  name: string;
  image: string[];
  action: boolean;
  feature: boolean;
  locked: boolean;
  categoryType: SelectOption[];
}
