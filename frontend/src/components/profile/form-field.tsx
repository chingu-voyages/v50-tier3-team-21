import {FieldError , UseFormRegister} from "react-hook-form";

interface FieldTypes {
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  contact: string,
  password: string
}

interface FormFieldProps {
  label: string,
  name: keyof FieldTypes
  type: string
  register: UseFormRegister<FieldTypes>,
  placeholder: string,
  className?: string,
  errors?: FieldError
  disabled?: boolean
}


export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  placeholder,
  register,
  className = "",
  errors,
  ...props
}) => {
  console.log(errors);
  return (
    <div className="flex flex-col relative">
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        {...register(name, { required: `${label} is requried` })}
        className={`border border-black m-1 p-3 rounded-lg text-sm text-red my-5  active:outline-secondary focus:outline-primary ${className}`}
        {...props}
      />
      {errors && (
        <span className="text-danger absolute bottom-0 text-xs right-0">
          {errors.message}
        </span>
      )}
    </div>
  );
};
