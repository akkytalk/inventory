import React from "react";
import { Input } from "reactstrap";
import { Field } from "formik";

function CustomCheckbox(props) {
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <label>
          <Input
            type="checkbox"
            {...props}
            checked={field.value.includes(props.value)}
            onChange={() => {
              if (field.value.includes(props.value)) {
                const nextValue = field.value.filter(
                  value => value !== props.value
                );
                form.setFieldValue(props.name, nextValue);
              } else {
                const nextValue = field.value.concat(props.value);
                form.setFieldValue(props.name, nextValue);
              }
            }}
          />
        </label>
      )}
    </Field>
  );
}

export default CustomCheckbox;
