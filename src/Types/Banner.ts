export interface BannerType {
  _id: string;
  image: string;
  youtubeLink: string;
  title: string;
  action: boolean;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface BannerState {
  page: number;
  limit: number;
  page_limit: number;
}

export interface BannerApiResponse {
  banner_data: BannerType[];
  totalData: number;
  state: BannerState;
}

export interface BannersSliceType {
  isBannerModal: boolean;
  allBanner: BannerApiResponse;
  isLoadingBanner: boolean;
  isBannerSearchData: string;
  singleEditingIdBanner: string;
  singleBannerData: BannerType;
}

export interface BannerFormData {
  title: string;
  youtubeLink: string;
  action: boolean;
  image: string[];
}

export interface AddBannersModalType {
  isEdit: boolean;
  setEdit: (isEdit: boolean) => void;
  getAllBanner: () => void;
}
