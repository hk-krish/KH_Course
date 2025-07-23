import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Post } from "../../Api";
import { Url_Keys } from "../../Constant";
import { RouteList } from "../../Constant/RouteList";
import { useAppDispatch } from "../../ReduxToolkit/Hooks";
import { login } from "../../ReduxToolkit/Slice/AuthSlice";
import { LoginSchema } from "../../Utils/ValidationSchemas";
import { LoginType } from "../../Types/Auth";

const Login = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginType) => {
    try {
      const response = await Post(Url_Keys.Auth.Login, data);
      if (response.status === 200) {
        dispatch(login(response.data));
        navigate(RouteList.Dashboard);
      }
    } catch (error) {}
  };

  return (
    <section className="log-in-section section-b-space">
      {/* <a href="" className="logo-login">
        <img src="assets/images/logo/1.png" className="img-fluid" alt="" />
      </a> */}
      <div className="container w-100">
        <div className="row">
          <div className="col-xl-5 col-lg-6 mx-auto">
            <div className="log-in-box">
              <div className="log-in-title">
                <h3>Welcome To HK Course</h3>
                <h5>Log In Your Account</h5>
              </div>
              <div className="input-box">
                <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
                  <div className="col-12">
                    <label className="col-form-label pt-0">Your Email</label>
                    <div className="form-floating theme-form-floating log-in-form">
                      <input type="email" placeholder="Enter Email" {...register("email")} />
                    </div>
                    {errors.email && <p className="text-danger mt-1">{errors.email.message}</p>}
                  </div>
                  <div className="col-12">
                    <label className="col-form-label pt-0">Your Password</label>
                    <div className="form-floating theme-form-floating log-in-form">
                      <input type={isPasswordVisible ? "text" : "password"} placeholder="Enter Password" {...register("password")} />
                      <div className="show-hide" onClick={() => setPasswordVisible(!isPasswordVisible)}>
                        <span className={!isPasswordVisible ? "show" : ""}> </span>
                      </div>
                    </div>
                    {errors.password && <p className="text-danger mt-1">{errors.password.message}</p>}
                  </div>
                  <div className="col-12">
                    <div className="forgot-box">
                      {/* <div className="form-check ps-0 m-0 remember-box">
                        <input className="custom-checkbox p-0" type="checkbox" name="text" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                          Remember me
                        </label>
                      </div> */}
                      <a href={RouteList.Otp} className="forgot-password">
                        Forgot Password?
                      </a>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-animation w-100 justify-content-center" type="submit">
                      Log In
                    </button>
                  </div>
                </form>
              </div>
              {/* <div className="other-log-in">
                <h6>or</h6>
              </div> */}
              {/* <div className="log-in-button">
                <ul>
                  <li>
                    <a href="https://www.google.com/" className="btn google-button w-100" target="_blank">
                      <img src="./assets/images/google.png" className="blur-up lazyload" alt="" /> Log In with Google
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/" className="btn google-button w-100" target="_blank">
                      <img src="./assets/images/facebook.png" className="blur-up lazyload" alt="" /> Log In with Facebook
                    </a>
                  </li>
                </ul>
              </div> */}
              {/* <div>
                <h6 className="text-center mt-3">
                  Don't have account?
                  <a href="sign-up.html" className="font-primary f-w-600 ps-1">
                    Create Account
                  </a>
                </h6>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
