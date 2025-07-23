import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Link, useNavigate } from "react-router-dom";
import { Post } from "../../Api";
import { Url_Keys } from "../../Constant";
import { RouteList } from "../../Constant/RouteList";
import { useAppDispatch } from "../../ReduxToolkit/Hooks";
import { login } from "../../ReduxToolkit/Slice/AuthSlice";
import { LoginSchema } from "../../Utils/ValidationSchemas";
import { LoginType } from "../../Types/Auth";
import { Button, Col, Container, Label, Row } from "reactstrap";

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
                  <h3>Login</h3>
                  <p>Enter your Email Id & Password to login</p>

                  <div className="input-box">
                    <Label className="col-form-label">Your Email</Label>
                    <input type="text" placeholder="Enter Your Email" {...register("email")} />
                    {errors.email && <p className="text-danger mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="input-box">
                    <Label className="col-form-label">Your Password</Label>
                    <div className="position-relative">
                      <input placeholder="Enter Your Password" type={isPasswordVisible ? "text" : "password"} {...register("password")} />
                      <div className="show-hide" onClick={() => setPasswordVisible(!isPasswordVisible)}>
                        <span className={!isPasswordVisible ? "show" : ""}> </span>
                      </div>
                    </div>
                    {errors.password && <p className="text-danger mt-1">{errors.password.message}</p>}
                  </div>

                  <div className="checkbox p-0">
                    <Link to={RouteList.Otp}>Forgot Password</Link>
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

export default Login;
