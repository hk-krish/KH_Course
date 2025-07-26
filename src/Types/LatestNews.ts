
export interface LatestNewsType {
  _id: string;
  thumbnail: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  priority: number;
}

export interface LatestNewsPaginationState {
  page: number;
  limit: number;
  page_limit: number;
}

export interface LatestNewsApiResponse {
  latestNews_data: LatestNewsType[];
  totalData: number;
  state: LatestNewsPaginationState;
}

export interface LatestNewsFormData {
  title: string;
  subtitle: string;
  description: string;
  image: string[];
  thumbnail: string[];
  priority: number;
}

export interface LatestNewsSliceType {
  allLatestNews: LatestNewsApiResponse;
  isLoadingLatestNews: boolean;
  isLatestNewsModal: boolean;
  singleEditingIdLatestNews: string;
  singleLatestNewsData: LatestNewsType;
}
