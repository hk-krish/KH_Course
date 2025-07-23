import { FC } from "react";
import { CustomCheckboxType } from "../Types/CoreComponents";

const CustomCheckbox: FC<CustomCheckboxType > = ({ title, name ,register}) => {
  return (
    <div className="input-box">
      <div className="icon-state">
        <label className="switch-xsm mb-0">
          <input type="checkbox" id={name} {...register(name)} />
          <span className="slider round" />
        </label>
        <label className="form-check-label" htmlFor={name}>
          {title}
        </label>
      </div>
    </div>
  );
};

export default CustomCheckbox;
