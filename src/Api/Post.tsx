import axios, { AxiosResponse } from "axios";
import { getToken } from "../Utils";
import { Toaster } from "../Utils/ToastNotification";
import { ApiResponse } from "../Types/CoreComponents";

let isRedirecting = false;

const Post = async <T = any,>(url: string, data: any, isToken: boolean = true): Promise<ApiResponse<T> | null> => {
  const isFormData = data instanceof FormData;
  const token = getToken();

  const headers: Record<string, string> = {
    ...(isToken ? { Authorization: token } : {}),
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
  };

  try {
    const response: AxiosResponse<ApiResponse<T>> = await axios.post(url, data, { headers });
    const resData = response.data;

    if (response.status === 200) {
      if (resData.status === 200) {
        Toaster("success", resData.message || "Success");
        return resData;
      } else {
        // Toaster("error", resData.message || "Something went wrong");
        return null;
      }
    }
    //  else if (response.status === 404) {
    //   Toaster("error", resData.message || "Not Found");
    // } else {
    //   Toaster("error", resData.message || "Something went wrong");
    // }
  } catch (error: any) {
    const msg = error?.response?.data?.message ;
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

export default Post;
