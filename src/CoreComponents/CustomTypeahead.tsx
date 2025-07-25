import { FC, Fragment } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { Controller } from "react-hook-form";
import { Label } from "reactstrap";
import { CustomTypeaheadType } from "../Types/CoreComponents";

const CustomTypeahead: FC<CustomTypeaheadType> = ({ errors, control, title, name, options, disabled, allowNew, required }) => {
  return (
    <Fragment>
      <Label>
        {title} {required && <span className="required">*</span>}
      </Label>
      <Controller name={name} control={control} render={({ field }) => <Typeahead disabled={disabled} {...field} multiple id={`${name}-typeahead`} options={options ? options : []} onChange={(selected) => field.onChange(selected)} selected={field.value || []} placeholder={`Add ${title}`} allowNew={allowNew} newSelectionPrefix="Add a new tag: " labelKey={(option) => (typeof option === "string" ? option : option.label)} />} />
      {errors && <p className="text-danger">{errors.message}</p>}
    </Fragment>
  );
};

export default CustomTypeahead;
