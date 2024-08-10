import {FieldError , FieldValues , Path , UseFormRegister} from "react-hook-form";
import {FormLabel} from "./form-label.tsx";


export  interface FormFieldProps<T extends  FieldValues>{
    type: string,
    placeholder: string,
    label?: string,
    name: Path<T>,
    register?: UseFormRegister<any>
    error?: FieldError | undefined,
    className?: string,
}
export const FormField = <T extends FieldValues> ({
                                                       type,
                                                       placeholder,
                                                       label,
                                                       name,

                                                       register,
                                                       className,
                                                       error
                                                   }: FormFieldProps<T>) => {
    return (
        <div className="w-full flex flex-col gap-1">
            {
                label && <FormLabel label={label} htmlFor={name} />
            }
            <input
                id={name as string}
                type={type}
                placeholder={placeholder}
                {...(register && register(name))}
                className={`${className}  px-3 py-2 border-2 rounded-lg placeholder:font-light placeholder:text-[0.8em] focus:outline-0`}
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
