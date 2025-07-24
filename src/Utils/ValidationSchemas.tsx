import * as yup from "yup";

const tagArraySchema = yup
  .array()
  .of(
    yup.lazy((value) =>
      typeof value === "string"
        ? yup.string()
        : yup.object().shape({
            label: yup.string().required(),
            customOption: yup.boolean().optional(),
          })
    )
  )
  .min(1, "At least one value is required")
  .required("This field is required");

export const LoginSchema = yup.object().shape({
  email: yup.string().email("Enter a valid email address").required("Email Id is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character"),
});

export const OtpSchema = yup.object().shape({
  email: yup.string().email("Enter a valid email address").required("Email Id is required"),
  otp: yup
    .number()
    .typeError("OTP must be a number")
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    }),
});

export const ResetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required("Password is required")
    .matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character"),
});

export const ChangePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required("Old Password is required")
    .matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Old Password must include at least one special character"),
  newPassword: yup
    .string()
    .required("New Password is required")
    .matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "New Password must include at least one special character"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Confirm Password must include at least one special character"),
});

export const BannerSchema = yup.object().shape({
  title: yup.string().notRequired(),
  youtubeLink: yup.string().required("Youtube Link is required"),
  action: yup.boolean().notRequired(),
  image: yup.array().min(1, "At least one image is required").required("Image is required"),
});

export const CategorySchema = yup.object().shape({
  name: yup.string().required("Category Name is required"),
  image: yup.array().min(1, "At least one image is required").required("Image is required"),
  action: yup.boolean().notRequired(),
  feature: yup.boolean().notRequired(),
});

export const CourseSchema = yup.object().shape({
  name: yup.string().required("Course Name is required"),
  image: yup.array().min(1, "At least one image is required").required("Image is required"),
  action: yup.boolean().notRequired(),
  feature: yup.boolean().notRequired(),
  categoryType: tagArraySchema,
});

export const StudentsSchema = yup.object().shape({
  name: yup.string().required("Course Name is required"),
  image: yup.array().min(1, "At least one image is required").required("Image is required"),
  action: yup.boolean().notRequired(),
  feature: yup.boolean().notRequired(),
  categoryType: yup.string().required("Category is required"),
});

export const LectureSchema = yup.object().shape({
  name: yup.string().required("Course Name is required"),
  image: yup.array().min(1, "At least one image is required").required("Image is required"),
  action: yup.boolean().notRequired(),
  feature: yup.boolean().notRequired(),
  categoryType: yup.string().required("Category is required"),
});
