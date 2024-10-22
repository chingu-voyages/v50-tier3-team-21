import { FormFieldProps} from "./types/profile-types";

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

  return (
    <div className={`flex flex-col w-full relative ${name === "contact" && "w-1/2"}`}>
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          {...register(name, { required: `${label} is requried` })}
          className={`border border-1 border-gray-200 p-4 rounded-lg text-sm text-gray-400 mt-3 mb-5 focus:border-black outline-none ${className}`}
          {...props}
        />
        {errors && (
          <span className="text-danger absolute bottom-1 text-xs right-0">
            {errors.message}
          </span>
        )}
    </div>
  );
};
