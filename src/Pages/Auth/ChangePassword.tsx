import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { Post } from "../../Api";
import { Url_Keys } from "../../Constant";
import { useAppSelector } from "../../ReduxToolkit/Hooks";
import { ChangePasswordType } from "../../Types/Auth";
import { ChangePasswordSchema } from "../../Utils/ValidationSchemas";
import { Card, CardBody, Col, Container, Label, Row } from "reactstrap";
import { Form } from "react-router-dom";
import Breadcrumbs from "../../CoreComponents/Breadcrumbs";
import CommonCardHeader from "../../CoreComponents/CommonCardHeader";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ChangePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordType) => {
    const changePassword = {
      email: user?.user?.email,
      oldPassword: data?.oldPassword,
      newPassword: data?.newPassword,
      confirmPassword: data?.confirmPassword,
    };
    try {
      setLoading(true);
      const response = await Post(Url_Keys.Auth.ChangePassword, changePassword);
      if (response.status === 200) {
        reset();
        setLoading(false);
      }
    } catch (error) {}
  };
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Change Password" parent="Pages" />
      <Container fluid>
        <Col md="12">
          <Card>
            <CommonCardHeader title="Change Password" />
            <CardBody>
              <div className="input-items">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row className="gy-3">
                    <Col md="12">
                      <div className="input-box">
                        <Label>Old Password</Label>
                        <input type="text" {...register("oldPassword")} placeholder="Enter Old Password" />
                        {errors.oldPassword && <p className="text-danger">{errors.oldPassword.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>New Password</Label>
                        <input type="text" {...register("newPassword")} placeholder="Enter New Password" />
                        {errors.newPassword && <p className="text-danger">{errors.newPassword.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>Confirm Password</Label>
                        <input type="text" {...register("confirmPassword")} placeholder="Enter Confirm password" />
                        {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="text-center mt-4">
                        <Button htmlType="submit" className="btn btn-primary" loading={loading}>
                          Save
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </Fragment>
  );
};

export default ChangePassword;
