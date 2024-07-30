import {ComponentType , useState} from 'react';
import {FormField , FormFieldProps} from "./form-field.tsx";
import {EyeIcon , EyeOffIcon} from "../ui";
import {FormLabel} from "./form-label.tsx";
import {FieldValues} from "react-hook-form";

interface PasswordFieldProps<T extends  FieldValues> extends  Omit<FormFieldProps<T> , 'type'> {}

//todo: use icons instead of hide or show text
const withPasswordToggle = <T extends FieldValues>(Component: ComponentType<FormFieldProps<T>>) => {
    return (props: PasswordFieldProps<T>) => {
        const [showPassword, setShowPassword] = useState(false);
        const {label, error, ...rest} = props
        const togglePasswordVisibility = () => {
            setShowPassword((prev) => !prev);
        };
        return (
            <div className="w-full flex flex-col gap-2  justify-center">
                <FormLabel label={label} htmlFor={props.name} />
                <div className="flex justify-center border rounded-lg">
                    <Component {...rest}
                               error={error}
                               type={showPassword ? 'text': 'password'}
                               className=" bg-transparent focus:outline-0 pr-12  border-none  "
                    />
                    <button
                        onClick={togglePasswordVisibility}
                        type={"button"}
                        className="flex justify-center items-center pr-3 text-secondary"
                    >
                        { showPassword ? <EyeIcon />:  <EyeOffIcon /> }
                    </button>
                </div>
                {error &&
                    <span
                        className="text-danger text-sm font-medium"
                        role={"alert"}>
                  { error?.message }
              </span>
                }
            </div>
        )
    }
}


export const PasswordField = withPasswordToggle(FormField);
