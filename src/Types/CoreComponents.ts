
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

export interface SvgProps {
  iconId: string | undefined;
  className?: string;
  style?: {
    height?: number;
    width?: number;
    fill?: string;
    marginRight?: number;
  };
  onClick?: () => void;
}

export interface ImageProps {
  className?: string;
  src: string;
  alt?: string;
  style?: Object;
  height?: number;
  id?: string;
  title?: string;
  width?: number;
}

export interface BreadcrumbsProps {
  mainTitle: string;
  parent: string;
}

export interface TypeFilterData {
  value?: string;
  label?: string;
}

export interface CardHeaderProp {
  title?: string;
  headClass?: string;
  tagClass?: string;
  isEditing?: boolean;
  setIsEditing?: (val: boolean) => void;
  Search?: (key: string) => void;
  searchClass?: string;
  btnTitle?: string;
  btnClick?: () => void;
  btnLink?: string;
  typeFilter?: (id: string) => void;
  typeFilterData?: TypeFilterData[];
  rowClass?: string;
}