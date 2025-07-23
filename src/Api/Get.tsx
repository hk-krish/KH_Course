import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getToken } from "../Utils";
import { Toaster } from "../Utils/ToastNotification";

export interface ApiResponse<T = any> {
  status: number;
  message?: string;
  data?: T;
}

let isRedirecting = false;

const Get = async <T = any>(url: string): Promise<ApiResponse<T> | null> => {
  const token:any = getToken();

  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = token;

  const config: AxiosRequestConfig = { headers };

  try {
    const response: AxiosResponse<ApiResponse<T>> = await axios.get(url, config);
    const resData = response.data;

    if (response.status === 200) {
      if (resData.status === 200) {
        return resData;
      } else {
        Toaster("error", resData.message || "Something went wrong");
        return null;
      }
    } else if (response.status === 404) {
      Toaster("error", resData.message || "Not Found");
    } else {
      Toaster("error", resData.message || "Something went wrong");
    }
  } catch (error: any) {
    const msg = error?.response?.data?.message || "Something went wrong";
    const status = error?.response?.status;

    if (status === 410 && !isRedirecting) {
      isRedirecting = true;
      window.location.href = "/session-expired";
      setTimeout(() => (isRedirecting = false), 1000);
    } else {
      Toaster("error", msg);
    }
  }

  return null;
};

export default Get;
