export const BASE_URL = process.env.REACT_APP_BASE_URL;

const URL = {
  Auth: {
    Login: "/auth/login",
    ForgotPassword: "/auth/forgot-password",
    VerifyOtp: "/auth/verify-otp",
    ResetPassword: "/auth/reset-password",
    ChangePassword: "/auth/change-password",
  },
  Banner: {
    Banner: "/banner",
    Add: "/banner/add",
    Edit: "/banner/edit",
    Delete: "/banner/delete",
  },
  Upload: {
    Upload: "/upload",
    Delete: "/upload",
  },
  Category: {
    Category: "/category",
    Add: "/category/add",
    Edit: "/category/edit",
    Delete: "/category/delete",
  },
  Course: {
    Course: "/course",
    Add: "/course/add",
    Edit: "/course/edit",
    Delete: "/course/delete",
  },
  Students: {
    Students: "/user",
    Add: "/user/add",
    Edit: "/user/edit",
    Delete: "/user/delete",
  },
  Lecture: {
    Lecture: "/lecture",
    Add: "/lecture/add",
    Edit: "/lecture/edit",
    Delete: "/lecture/delete",
  },
  AboutUs: {
    AboutUs: "/about-us",
    AboutUsEdit: "/about-us/add/edit",
  },
  PrivacyPolicy: {
    PrivacyPolicy: "/privacy-policy",
    PrivacyPolicyEdit: "/privacy-policy/add/edit",
  },
  TermsCondition: {
    TermsCondition: "/terms-condition",
    TermsConditionEdit: "/terms-condition/add/edit",
  },
  Faq: {
    Faq: "/faq",
    Add: "/faq/add",
    Edit: "/faq/edit",
    Delete: "/faq",
  },
  Blog: {
    Blog: "/blog",
    Add: "/blog/add",
    Edit: "/blog/edit",
    Delete: "/blog",
  },
  LatestNews: {
    LatestNews: "/latest-news",
    Add: "/latest-news/add",
    Edit: "/latest-news/edit",
    Delete: "/latest-news",
  },
} as const;

type UrlMap = typeof URL;
type ResolvedUrlMap = {
  [K in keyof UrlMap]: UrlMap[K] extends string ? string : { [P in keyof UrlMap[K]]: string };
};

export const Url_Keys: ResolvedUrlMap = Object.fromEntries(
  Object.entries(URL).map(([key, value]) => {
    if (typeof value === "string") {
      return [key, `${BASE_URL}${value}`];
    } else {
      const nested = Object.fromEntries(Object.entries(value).map(([subKey, path]) => [subKey, `${BASE_URL}${path}`]));
      return [key, nested];
    }
  })
) as ResolvedUrlMap;
