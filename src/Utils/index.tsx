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

export const generateOptions = (data?: { _id: string; name: string }[]) => data?.map((item) => ({ value: item._id, label: item.name })) || [];
