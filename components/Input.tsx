import React, { useState } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";
import ReactInputMask from "react-input-mask";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  name: string;
  error?: string;
  register?: UseFormRegister<FieldValues>;
  registerOptions?: any;
  mask?: string;
  half?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  register = () => ({}),
  registerOptions,
  mask,
  half,
  error,
  ...props
}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <div
      className={`form-group col-xs-12 col-sm-6 has-feedback ${
        error ? `has-error` : ``
      }`}
    >
      <label htmlFor="valrt_LastName">{label}</label>
      {mask ? (
        <ReactInputMask
          mask={mask}
          {...register(name, {
            onBlur: () => {
              setIsFocus(false);
            },
            ...registerOptions,
          })}
          onFocus={() => {
            setIsFocus(true);
          }}
        >
          {
            // @ts-ignore
            () => (
              <input
                type="text"
                className="form-control "
                maxLength={50}
                aria-describedby="valrt_LastName-hint"
                defaultValue=""
                data-fv-field="LastName"
                {...register(name, {
                  onBlur: () => setIsFocus(false),
                  ...registerOptions,
                })}
                {...props}
              />
            )
          }
        </ReactInputMask>
      ) : (
        <input
          type="text"
          className="form-control "
          maxLength={50}
          aria-describedby="valrt_LastName-hint"
          defaultValue=""
          data-fv-field="LastName"
          onFocus={() => setIsFocus(true)}
          {...register(name, {
            onBlur: () => setIsFocus(false),
            ...registerOptions,
          })}
          {...props}
        />
      )}
      <i
        className={`form-control-feedback ${error ? `icon-warning-solid` : ``}`}
        style={{ ...(!error ? { display: "none" } : {}) }}
      />
      <div
        className="LastName help-block"
        style={{ display: error ? `block` : "none", width: "219.828px" }}
      >
        <small
          className="help-block"
          data-fv-validator="blank"
          data-fv-for="LastName"
          data-fv-result="NOT_VALIDATED"
          style={{
            display: error && isFocus ? `block` : "none",
            width: "245.828px",
            top: error && isFocus ? `69px` : `35px`,
          }}
        >
          {error}
        </small>
        {/* <small
          className="help-block"
          data-fv-validator="notEmpty"
          data-fv-for="LastName"
          data-fv-result="NOT_VALIDATED"
          style={{ display: "none", width: "245.828px" }}
        >
          Last Name is required.
        </small>
        <small
          className="help-block"
          data-fv-validator="regexp"
          data-fv-for="LastName"
          data-fv-result="NOT_VALIDATED"
          style={{ display: "none", width: "245.828px" }}
        >
          Please enter a valid Last Name
        </small>
        <small
          className="help-block"
          data-fv-validator="stringLength"
          data-fv-for="LastName"
          data-fv-result="NOT_VALIDATED"
          style={{ display: "none", width: "245.828px" }}
        >
          Please enter a value with valid length
        </small> */}
      </div>
    </div>
  );
};
