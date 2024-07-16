import {FieldError , UseFormRegister} from "react-hook-form";

export  interface FormFieldProps<T, Key extends keyof T>{
    type: string,
    placeholder: string,
    label?: string,
    name: Key,
    isRequired: boolean,
    register: UseFormRegister<T>
    error: FieldError | undefined,
    valueAsNumber?: boolean | undefined,
    className?: string
}
export const FormField = <T, key extends keyof T> ({
                              type,
                              placeholder,
                              label,
                              name,
                              isRequired,
                              register,
                              className,
                              valueAsNumber,
                              error
}: FormFieldProps<T, key>) => {
   return (
      <div className="w-full flex flex-col gap-2">
          {
              label &&
              <label
                  htmlFor={name}
                  className="text-[1em]"
              >
                  { label }
              </label>
          }
          <input
              id={name as string}
              type={type}
              placeholder={placeholder}
              {...register(name)}
              className={`${className}  px-3 py-2.5 rounded-lg placeholder:font-light placeholder:text-[0.8em] focus:outline-0`}
          />
          {
              error &&
              <span
                  className="text-danger text-sm font-medium"
                  role={"alert"}>
                  { error?.message }
              </span>
          }
      </div>
   )
}
