import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { getToken } from "../Utils";
import { ApiResponse } from "../Types/CoreComponents";
import { Toaster } from "../Utils/ToastNotification";

const Delete = async <T = any,>(url: string, data?: any, toaster: boolean = true): Promise<ApiResponse<T> | null> => {
  let isRedirecting = false;
  const token: any = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = token;

  const config: AxiosRequestConfig = {
    headers,
    data,
  };

  try {
    const response: AxiosResponse<ApiResponse<T>> = await axios.delete(url, config);
    const resData = response.data;

    if (response.status === 200) {
      if (resData.status === 200) {
        Toaster("success", resData.message || "Success");
        return resData;
      } else {
        Toaster("error", resData.message || "Something went wrong");
        return null;
      }
    } else if (toaster) {
      if (response.status === 404) {
        Toaster("error", resData.message || "Not Found");
      } else {
        Toaster("error", resData.message || "Something went wrong");
      }
    }
  } catch (error: unknown) {
    const err = error as AxiosError<{ message?: string }>;
    const msg = err?.response?.data?.message || "Something went wrong";
    const status = err?.response?.status;

    if (toaster) {
      if (status === 410 && !isRedirecting) {
        isRedirecting = true;
        window.location.href = "/";
        setTimeout(() => (isRedirecting = false), 1000);
      } else {
        Toaster("error", msg);
      }
    }
  }

  return null;
};

export default Delete;
