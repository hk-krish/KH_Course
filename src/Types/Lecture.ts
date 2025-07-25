import { SelectOption } from "./CoreComponents";

export interface LectureType {
  _id: string;
  title: string;
  youtubeLink: string;
  priority: number;
  thumbnail: string;
  PDF: string;
  userIds: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LectureState {
  page: number;
  limit: number;
  page_limit: number;
}

export interface LectureApiResponse {
  lecture_data: LectureType[];
  totalData: number;
  state: LectureState;
}

export interface LectureSliceType {
  isLectureModal: boolean;
  allLecture: LectureApiResponse;
  isLoadingLecture: boolean;
  singleEditingIdLecture: string;
  singleLectureData: LectureType;
  singleCourseId: string;
}

export interface LectureFormData {
  title: string;
  youtubeLink: string;
  priority: number;
  userIds: SelectOption[];
}
