import { FC, Fragment } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { Controller } from "react-hook-form";
import { Label } from "reactstrap";
import { CustomTypeaheadType } from "../Types/CoreComponents";

const CustomTypeahead: FC<CustomTypeaheadType> = ({ errors, control, title, name, options, disabled, allowNew, required, onChangeOverride }) => {
  return (
    <Fragment>
      <Label>
        {title} {required && <span className="required">*</span>}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Typeahead
            {...field}
            disabled={disabled}
            multiple
            id={`${name}-typeahead`}
            options={options || []}
            onChange={(selected) => {
              if (onChangeOverride) {
                onChangeOverride(selected, field.onChange);
              } else {
                field.onChange(selected);
              }
            }}
            selected={field.value || []}
            placeholder={`Add ${title}`}
            allowNew={allowNew}
            labelKey={(option) => (typeof option === "string" ? option : option.label)}
          />
        )}
      />
      {errors && <p className="text-danger">{errors.message}</p>}
    </Fragment>
  );
};

export default CustomTypeahead;
