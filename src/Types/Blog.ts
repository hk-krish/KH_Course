
export interface BlogType {
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

export interface BlogPaginationState {
  page: number;
  limit: number;
  page_limit: number;
}

export interface BlogApiResponse {
  blog_data: BlogType[];
  totalData: number;
  state: BlogPaginationState;
}

export interface BlogFormData {
  title: string;
  subtitle: string;
  description: string;
  image: string[];
  thumbnail: string[];
  priority: number;
}

export interface BlogSliceType {
  allBlog: BlogApiResponse;
  isLoadingBlog: boolean;
  isBlogModal: boolean;
  singleEditingIdBlog: string;
  singleBlogData: BlogType;
}
