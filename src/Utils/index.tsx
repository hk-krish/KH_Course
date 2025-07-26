import { SelectOption } from "../Types/CoreComponents";

//dynamic image
const images = require.context(`/public/assets/images`, true);

export const dynamicImage = (image: string) => {
  return images(`./${image}`);
};

//dynamic Number
export const dynamicNumber = (totalLength: number) => {
  return Array.from({ length: totalLength }, (_, index) => index + 1);
};

//get token
export const getToken = () => {
  return JSON.parse(localStorage.getItem("hk-course-admin-token"));
};

export const generateOptions = (data?: { _id: string; name?: string; firstName?: string; lastName?: string }[]) => {
  if (!data || !Array.isArray(data)) return [];

  return data.map((item) => {
    const label = item.name?.trim() || [item.firstName, item.lastName].filter(Boolean).join(" ") || "Unnamed";

    return {
      value: item._id,
      label,
    };
  });
};

export const normalizeTags = (items: SelectOption[] = []) => items.map((item) => (typeof item === "string" ? item : item.value));
