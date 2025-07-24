export interface LectureType {
  _id: string;
  name: string;
  image: string;
  feature: boolean;
  action: boolean;
  locked: boolean;
  categoryType:string;
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
}

export interface LectureFormData {
  name: string;
  image: string[];
  action: boolean;
  feature: boolean;
  locked: boolean;
  categoryType:string
}
