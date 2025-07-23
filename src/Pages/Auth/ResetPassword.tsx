import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Post } from "../../Api";
import { RouteList, Url_Keys } from "../../Constant";
import { ResetPasswordSchema } from "../../Utils/ValidationSchemas";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { login } from "../../ReduxToolkit/Slice/AuthSlice";
import { ResetPasswordType } from "../../Types/Auth";

const ResetPassword = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const { isEmailOtp } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ResetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordType) => {
    try {
      const response = await Post(Url_Keys.Auth.ResetPassword, { email: isEmailOtp, newPassword: data.newPassword });
      if (response.status === 200) {
        dispatch(login(response.data));
        navigate(RouteList.Dashboard);
        localStorage.removeItem("hk-course-admin-otp-email");
      }
    } catch (error) {}
  };

  const maskEmail = (email: string): string => {
    const [localPart, domain] = email.split("@");
    const visibleChars = localPart.slice(-2);
    const maskedLocal = "*".repeat(localPart.length - 2) + visibleChars;
    return `${maskedLocal}@${domain}`;
  };

  return (
    <section className="log-in-section section-b-space">
      <div className="container w-100">
        <div className="row">
          <div className="col-xl-5 col-lg-6 mx-auto">
            <div className="log-in-box">
              <div className="log-in-title">
                <h3>Welcome To HK Course</h3>
                <h5>
                  A code has been sent to <span>{maskEmail(isEmailOtp)}</span>
                </h5>
              </div>
              <div className="input-box">
                <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
                  <div className="col-12">
                    <label className="col-form-label pt-0">New Password</label>
                    <div className="form-floating theme-form-floating log-in-form">
                      <input type={isPasswordVisible ? "text" : "password"} placeholder="Enter New Password" {...register("newPassword")} />
                      <div className="show-hide" onClick={() => setPasswordVisible(!isPasswordVisible)}>
                        <span className={!isPasswordVisible ? "show" : ""}> </span>
                      </div>
                    </div>
                    {errors.newPassword && <p className="text-danger mt-1">{errors.newPassword.message}</p>}
                  </div>
                  <div className="col-12">
                    <button className="btn btn-animation w-100 justify-content-center" type="submit">
                      Log In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
