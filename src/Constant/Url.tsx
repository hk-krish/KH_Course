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
    Banner: "/banner/getall",
    Single: "/banner/get",
    Add: "/banner/add",
    Edit: "/banner/edit",
    Delete: "/banner/delete",
  },
  Upload: {
    Upload: "/upload",
    Delete: "/upload",
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
