import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup.string().email("Enter a valid email address").required("Email Id is required"),
  password: yup
    .string()
    .matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character")
    .required("Password is required"),
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
    .matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character")
    .required("Password is required"),
});

export const ChangePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Old Password must include at least one special character")
    .required("Old Password is required"),
  newPassword: yup
    .string()
    .matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "New Password must include at least one special character")
    .required("New Password is required"),
  confirmPassword: yup
    .string()
    .matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Confirm Password must include at least one special character")
    .required("Confirm Password is required"),
});

export const BannerSchema = yup.object().shape({
  title: yup.string().notRequired(),
  youtubeLink: yup.string().required("Youtube Link is required"),
  action: yup.boolean().notRequired(),
  image: yup.array().min(1, "At least one image is required").required("Image is required"),
});
