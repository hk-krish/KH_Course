
export interface ApiResponse<T> {
  status: number;
  message?: string;
  data?: T;
}

export interface Params {
  [key: string]: any;
}

export interface FetchApiParams {
  page?: number;
  limit?: number;
  search?: string;
  typeFilter?: string;
  category?: string;
  id?: string;
}

export interface CustomCheckboxType {
  register: any;
  name: string;
  title?: string;
}