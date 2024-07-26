import React from 'react';
import {FormField , FormFieldProps} from "./form-field.tsx";
import {EyeIcon , EyeOffIcon} from "../ui";

interface PasswordFieldProps<T> extends Omit<FormFieldProps<T>, 'type'> {}

const withPasswordToggle = <T ,>(
    Component: React.ComponentType<FormFieldProps<T>>
) => {
    return (props: PasswordFieldProps<T>) => {
        const { label, className, name, error, ...rest } = props;
        const [isPasswordVisible, setPasswordVisibility] = React.useState(false);

        const togglePasswordVisibility = () => {
            setPasswordVisibility(!isPasswordVisible);
        };

        return (
            <div className="w-full flex flex-col gap-2 justify-center">
                <label htmlFor={name as string}>{label}</label>
                <div className="w-full border rounded-lg relative">
                    <Component
                        {...rest as FormFieldProps<T>}
                        type={isPasswordVisible ? 'text' : 'password'}
                        register={rest.register}
                        className={`bg-transparent focus:outline-0 border-none ${className || ''}`}
                    />
                    <button
                        onClick={togglePasswordVisibility}
                        type="button"
                        className="absolute right-0 top-1/2 -translate-y-1/2 pr-3 text-secondary"
                    >
                        {isPasswordVisible ? <EyeIcon /> : <EyeOffIcon />}
                    </button>
                </div>
                {error && (
                    <span className="text-danger text-sm font-medium" role="alert">
                        {error.message}
                    </span>
                )}
            </div>
        );
    };
};

export const PasswordField = withPasswordToggle(FormField);

