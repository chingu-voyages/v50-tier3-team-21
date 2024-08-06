import React, { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "../ui";

// types
interface FieldTypes {
  password: string;
  confirmPassword: string
}

interface FormFieldProps {
  label: string;
  name: keyof FieldTypes; //because i'm using ...register(name), i need to add this...
  register: UseFormRegister<FieldTypes>;
  placeholder: string;
  className?: string;
  errors?: FieldError;
}

export const FormPasswordField: React.FC<FormFieldProps> = ({
  label,
  name,
  register,
  placeholder,
  className = "",
  errors,
  ...props
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="flex flex-col relative">
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
      <input
        className="border border-black m-1 p-4 rounded-lg text-sm text-red my-5  active:outline-secondary focus:outline-primary"
        type={passwordVisible ? "text" : "password"}
        id={name}
        {...register(name, { required: "Password is required" })}
        placeholder={placeholder}
        minLength={8}
        {...props}
      />
      <div
        className="absolute top-[47%] right-5 cursor-pointer text-secondary"
        onClick={() => setPasswordVisible((prev) => !prev)}
      >
        {passwordVisible ? <EyeIcon /> : <EyeOffIcon />}
      </div>
      {errors && (
        <span className="text-danger absolute bottom-0 text-xs right-0">
          {errors.message}
        </span>
      )}
    </div>
  );
};
