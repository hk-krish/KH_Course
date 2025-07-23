export interface ChangePasswordType {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export interface LoginType {
  email: string;
  password: string;
}

export interface OtpType {
  email: string;
  otp?: string;
}

export interface ResetPasswordType {
  newPassword: string;
}
