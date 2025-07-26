export interface PrivacyPolicyType {
  _id: string;
  isDeleted: boolean;
  createdAt: string;
  privacyPolicy: string;
  updatedAt: string;
}

export interface AboutUsType {
  _id: string;
  isDeleted: boolean;
  aboutUs: string;
  createdAt: string;
  updatedAt: string;
}

export interface TermsConditionType {
  _id: string;
  isDeleted: boolean;
  termsCondition: string;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentSliceType {
  allPrivacyPolicy: PrivacyPolicyType | null;
  allAboutUs: AboutUsType | null;
  allTermsCondition: TermsConditionType | null;
}
