export interface StudentsType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  isDeleted: boolean;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
  image: string;
}

export interface StudentsState {
  page: number;
  limit: number;
  page_limit: number;
}

export interface StudentsApiResponse {
  user_data: StudentsType[];
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
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  image: string[];
}
