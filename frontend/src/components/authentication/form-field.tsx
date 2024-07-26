import {FieldError , FieldValues , Path , UseFormRegister} from "react-hook-form";


export interface FormFieldProps<TFormValues> {
    type: string;
    placeholder: string;
    label?: string;
    name: Path<TFormValues>;
    register: UseFormRegister<any>;
    error: FieldError | undefined;
    className?: string;
}

export const FormField = <T extends FieldValues>({
                                                     type,
                                                     placeholder,
                                                     label,
                                                     name,
                                                     register,
                                                     className,
                                                     error,
                                                 }: FormFieldProps<T>) => {
    return (
        <div className="w-full flex flex-col gap-1">
            {label && <label htmlFor={name as string}>{label}</label>}
            <input
                id={name as string}
                type={type}
                placeholder={placeholder}
                {...register(name)}
                className={`${className} px-3 py-2 border-2 rounded-lg placeholder:font-light placeholder:text-[0.8em] focus:outline-0`}
            />
            {error && (
                <span className="text-danger text-sm font-medium" role="alert">
                    {error.message}
                </span>
            )}
        </div>
    );
};
