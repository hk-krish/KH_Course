import { FormEvent } from "react";

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
  courseFilter?: string;
  blockFilter?: string;
  role?: string;
  senderId?: string;
  receiverId?: string;
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

export interface ModalPassPropsType {
  getApi: () => void;
  isEdit: boolean;
  setEdit: (isEdit: boolean) => void;
}

export interface CustomTypeaheadType {
  errors: any;
  control: any;
  title?: string;
  name?: string;
  options?: any;
  disabled?: boolean;
  allowNew?: boolean;
  required?: boolean;
  onChangeOverride?: (selected: any[], onChange: (val: any) => void) => void;
}

export interface SelectOption {
  label: string;
  id?: string;
  customOption?: boolean;
  value?: string;
}

export interface InformationProp {
  headerTitle?: string;
  editorContent: string;
  setEditorContent: (content: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
}
