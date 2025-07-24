export interface CategoryType {
  _id: string;
  image: string;
  name: string;
  feature: boolean;
  action: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryState {
  page: number;
  limit: number;
  page_limit: number;
}

export interface CategoryApiResponse {
  category_data: CategoryType[];
  totalData: number;
  state: CategoryState;
}

export interface CategorySliceType {
  isCategoryModal: boolean;
  allCategory: CategoryApiResponse;
  isLoadingCategory: boolean;
  singleEditingIdCategory: string;
  singleCategoryData: CategoryType;
}

export interface CategoryFormData {
  feature: boolean;
  name: string;
  action: boolean;
  image: string[];
}
