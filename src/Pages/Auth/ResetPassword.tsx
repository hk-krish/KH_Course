import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import { Post } from "../../Api";
import { RouteList, Url_Keys } from "../../Constant";
import { ResetPasswordSchema } from "../../Utils/ValidationSchemas";
import { useAppDispatch, useAppSelector } from "../../ReduxToolkit/Hooks";
import { login } from "../../ReduxToolkit/Slice/AuthSlice";
import { ResetPasswordType } from "../../Types/Auth";
import { Button, Col, Container, Label, Row } from "reactstrap";

const ResetPassword = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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

  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card">
            <div>
              <div>
                {/* <Link className="logo" to={RouteList.Dashboard}> */}
                {/* <Image className="img-fluid for-light" src={dynamicImage(`logo/logo.png`)} alt="loginPage" /> */}
                {/* <Image className="img-fluid for-dark" src={dynamicImage(`logo/logo_dark.png`)} alt="loginPage" /> */}
                {/* </Link> */}
              </div>
              <div className="login-main">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <h3>Reset Password</h3>
                  <p>Enter your New Password to login</p>

                  <div className="input-box">
                    <Label className="col-form-label">Your New Password</Label>
                    <div className="position-relative">
                      <input placeholder="Enter Your Password" type={isPasswordVisible ? "text" : "password"} {...register("newPassword")} />
                      <div className="show-hide" onClick={() => setPasswordVisible(!isPasswordVisible)}>
                        <span className={!isPasswordVisible ? "show" : ""}> </span>
                      </div>
                    </div>
                    {errors.newPassword && <p className="text-danger mt-1">{errors.newPassword.message}</p>}
                  </div>
                  <div className="text-end mt-3">
                    <Button color="primary" className="w-100" block>
                      Login
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
