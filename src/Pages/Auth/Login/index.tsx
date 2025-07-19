import React from "react";

const Login = () => {
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
                <h3>Welcome To Zomo</h3>
                <h5>Log In Your Account</h5>
              </div>
              <div className="input-box">
                <form className="row g-3">
                  <div className="col-12">
                    <label className="col-form-label pt-0">Your Email</label>
                    <div className="form-floating theme-form-floating log-in-form">
                      <input type="email" name="email" placeholder="Enter Email" />
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="col-form-label pt-0">Your Password</label>
                    <div className="form-floating theme-form-floating log-in-form">
                      <input type="password" name="password" placeholder="Enter Password" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="forgot-box">
                      <div className="form-check ps-0 m-0 remember-box">
                        <input className="custom-checkbox p-0" type="checkbox" name="text" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                          Remember me
                        </label>
                      </div>
                      <a href="forgot-password.html" className="forgot-password">
                        Forgot Password?
                      </a>
                    </div>
                  </div>
                  <div className="col-12">
                    <a href="index.html" className="btn btn-animation w-100 justify-content-center" type="submit">
                      Log In
                    </a>
                  </div>
                </form>
              </div>
              <div className="other-log-in">
                <h6>or</h6>
              </div>
              <div className="log-in-button">
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
              </div>
              <div>
                <h6 className="text-center mt-3">
                  Don't have account?
                  <a href="sign-up.html" className="font-primary f-w-600">
                    Create Account
                  </a>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
