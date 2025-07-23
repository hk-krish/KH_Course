import { Button } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import { Col, Container, Label, Row } from "reactstrap";
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
  } = useForm({ defaultValues: { email: "", otp: "" } });

  const onSubmit = async (data: OtpType) => {
    try {
      if (!isOtp) {
        setLoading(true);
        const response = await Post(Url_Keys.Auth.ForgotPassword, { email: data.email });
        if (response.status === 200) {
          dispatch(setEmailOtp(data.email));
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
                  <h3>Forgot Password</h3>
                  <p>Enter your Email Id </p>

                  <div className="input-box">
                    <Label className="col-form-label">Your Email</Label>
                    <input type="text" placeholder="Enter Your Email" {...register("email", { required: "Email Id is required" })} />
                    {errors.email && <p className="text-danger mt-1">{errors.email.message}</p>}
                  </div>

                  {isOtp && (
                    <div className="input-box">
                      <Label className="col-form-label">Your OTP</Label>
                      <input type="number" placeholder="Enter OTP" {...register("otp", { required: isOtp ? "OTP is required" : false })} />
                      {errors.otp && <p className="text-danger m-0">{errors.otp.message}</p>}
                    </div>
                  )}

                  <div className="text-end mt-3">
                    <Button htmlType="submit" className="w-100 btn btn-primary" block size="large" loading={loading}>
                      {isOtp ? "Verify OTP" : "Send OTP"}
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

export default Otp;
