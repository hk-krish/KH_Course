export interface StudentsType {
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

export interface StudentsState {
  page: number;
  limit: number;
  page_limit: number;
}

export interface StudentsApiResponse {
  students_data: StudentsType[];
  totalData: number;
  state: StudentsState;
}

export interface StudentsSliceType {
  isStudentsModal: boolean;
  allStudents: StudentsApiResponse;
  isLoadingStudents: boolean;
  singleEditingIdStudents: string;
  singleStudentsData: StudentsType;
}

export interface StudentsFormData {
  name: string;
  image: string[];
  action: boolean;
  feature: boolean;
  locked: boolean;
  categoryType:string
}
