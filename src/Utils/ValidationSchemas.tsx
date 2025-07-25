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

const PrioritySchema = yup
  .number()
  .typeError("Priority must be a number")
  .transform((value, originalValue) => {
    return originalValue === "" ? undefined : value;
  })
  .min(1, "Priority must be at least 1")
  .required("Priority is required");

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
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

export const BannerSchema = yup.object().shape({
  title: yup.string().notRequired(),
  youtubeLink: yup.string().required("Youtube Link is required"),
  action: yup.boolean().notRequired(),
  image: yup.array().min(1, "At least one image is required").required("Image is required"),
  priority: PrioritySchema,
});

export const CategorySchema = yup.object().shape({
  name: yup.string().required("Category Name is required"),
  image: yup.array().min(1, "At least one image is required").required("Image is required"),
  action: yup.boolean().notRequired(),
  feature: yup.boolean().notRequired(),
  priority: PrioritySchema,
});

export const CourseSchema = yup.object().shape({
  name: yup.string().required("Course Name is required"),
  image: yup.array().min(1, "At least one image is required").required("Image is required"),
  action: yup.boolean().notRequired(),
  feature: yup.boolean().notRequired(),
  categoryIds: tagArraySchema,
  userIds: tagArraySchema,
  priority: PrioritySchema,
});

export const StudentsSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Enter a valid email address").notRequired(),
  password: yup
    .string()
    .required("Password is required")
    .matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character"),
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .matches(/^[0-9]{10}$/, "Phone Number must be exactly 10 digits and contain no letters"),
  image: yup.array().min(1, "At least one image is required").notRequired(),
});

export const LectureSchema = yup.object().shape({
  title: yup.string().required("Lecture Title is required"),
  youtubeLink: yup.string().required("Youtube Link is required"),
  image: yup.array().min(1, "At least one image is required").required("Image is required"),
  pdf: yup.array().notRequired(),
  priority: yup
    .number()
    .typeError("Priority must be a number")
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .min(1, "Priority must be at least 1")
    .required("Priority is required"),
  userIds: tagArraySchema,
});
