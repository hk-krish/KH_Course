import { FC } from "react";
import { CustomCheckboxType } from "../Types/CoreComponents";
import { Label } from "reactstrap";

const CustomCheckbox: FC<CustomCheckboxType> = ({ title, name, register }) => {
  return (
    <div className="d-flex">
      <Label className="col-form-label m-r-10" htmlFor={name}>
        {title}
      </Label>
      <div className="text-end switch-sm">
        <Label className="switch">
          <input type="checkbox" id={name} {...register(name)} />
          <span className="switch-state"></span>
        </Label>
      </div>
    </div>
  );
};

export default CustomCheckbox;
