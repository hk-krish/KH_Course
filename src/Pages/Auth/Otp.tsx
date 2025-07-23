import { Button } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Post } from "../../Api";
import { RouteList, Url_Keys } from "../../Constant";
import { useAppDispatch } from "../../ReduxToolkit/Hooks";
import { setEmailOtp } from "../../ReduxToolkit/Slice/AuthSlice";
import { OtpType } from "../../Types/Auth";

const Otp = () => {
  const [isOtp, setOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", otp: "" }});

  const onSubmit = async (data: OtpType) => {
    try {
      if (!isOtp) {
        setLoading(true);
        const response = await Post(Url_Keys.Auth.ForgotPassword, { email: data.email });
        if (response.status === 200) {
          dispatch(setEmailOtp(data.email))
          setOtp(true);
          setLoading(false);
        }
      } else {
        setLoading(true);
        const response = await Post(Url_Keys.Auth.VerifyOtp, data);
        if (response.status === 200) {
          setOtp(false);
          setLoading(false);
          navigate(RouteList.ResetPassword);
        }
      }
    } catch (error) {}
  };

  return (
    <section className="log-in-section section-b-space">
      <div className="container w-100">
        <div className="row">
          <div className="col-xl-5 col-lg-6 mx-auto">
            <div className="log-in-box">
              <div className="log-in-title">
                <h3>Welcome To HK Course</h3>
                <h4>Send OTP</h4>
              </div>
              <div className="input-box">
                <form onSubmit={handleSubmit(onSubmit)} className="row g-4">
                  <div className="col-12">
                    <input type="email" placeholder="Enter Email" {...register("email", { required: "Email Id is required" })} />
                    {errors.email && <p className="text-danger m-0">{errors.email.message}</p>}
                  </div>

                  {isOtp && (
                    <div className="col-12">
                      <input type="number" placeholder="Enter OTP" {...register("otp", { required: isOtp ? "OTP is required" : false })} />
                      {errors.otp && <p className="text-danger m-0">{errors.otp.message}</p>}
                    </div>
                  )}

                  <div className="col-12">
                    <Button htmlType="submit" className="btn btn-animation w-100 justify-content-center" type="primary" size="large" loading={loading}>
                      {isOtp ? "Verify OTP" : "Send OTP"}
                    </Button>
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

export default Otp;
