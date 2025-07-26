export interface FaqType {
  _id: string;
  question: string;
  answer: string;
  priority: number;
  isDeleted: boolean;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FaqState {
  page: number;
  limit: number;
  page_limit: number;
}

export interface FaqApiResponse {
  faq_data: FaqType[];
  totalData: number;
  state: FaqState;
}

export interface FaqSliceType {
  isAddFaqModal: boolean;
  allFaq: FaqApiResponse;
  isLoadingFaq: boolean;
  isFaqSearchData: string;
  singleEditingFaq: FaqType;
}

export interface AddFaqModalType {
  isEdit: boolean;
  setEdit: (isEdit: boolean) => void;
  getAllFaq: () => void;
}
