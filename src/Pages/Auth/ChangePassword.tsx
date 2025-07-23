import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Post } from "../../Api";
import { Url_Keys } from "../../Constant";
import { useAppSelector } from "../../ReduxToolkit/Hooks";
import { ChangePasswordType } from "../../Types/Auth";
import { ChangePasswordSchema } from "../../Utils/ValidationSchemas";

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
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5>Change Password</h5>
                </div>
                <div className="card-body">
                  <div className="input-items">
                    <form className="row gy-3" onSubmit={handleSubmit(onSubmit)}>
                      <div className="col-12">
                        <div className="input-box">
                          <h6>Old Password</h6>
                          <input type="text" name="text" placeholder="Enter Old Password" {...register("oldPassword")} />
                          {errors.oldPassword && <p className="text-danger mt-1">{errors.oldPassword.message}</p>}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-box">
                          <h6>New Password</h6>
                          <input type="text" placeholder="Enter New Password" {...register("newPassword")} />
                          {errors.newPassword && <p className="text-danger mt-1">{errors.newPassword.message}</p>}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-box">
                          <h6>Confirm Password</h6>
                          <input type="text" name="text" placeholder="Enter Confirm Password" {...register("confirmPassword")} />
                          {errors.confirmPassword && <p className="text-danger mt-1">{errors.confirmPassword.message}</p>}
                        </div>
                      </div>
                      <div className="col-12">
                        <Button htmlType="submit" className="btn restaurant-button" type="primary" size="large">
                          Save
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
