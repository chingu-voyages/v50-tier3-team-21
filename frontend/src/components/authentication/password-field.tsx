import React , {useState} from "react";
import {FormField , FormFieldProps} from "./form-field.tsx";
import {EyeIcon , EyeOffIcon} from "../ui";
import {FormLabel} from "./form-label.tsx";


interface PasswordFieldProps<T> extends  Omit<FormFieldProps<T , keyof T> , 'type'> {}

//todo: use icons instead of hide or show text
const withPasswordToggle = <T,>(Component: React.ComponentType<FormFieldProps<T , keyof  T>> ) => {
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
