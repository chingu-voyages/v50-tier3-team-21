import React , {useState} from "react";
import {FormField , FormFieldProps} from "./form-field.tsx";
import {EyeIcon , EyeOffIcon} from "../ui";


interface PasswordFieldProps<T> extends  Omit<FormFieldProps<T , keyof T> , 'type'> {}

//todo: use icons instead of hide or show text
const withPasswordToggle = <T,>(Component: React.ComponentType<FormFieldProps<T , keyof  T>> ) => {
   return (props: PasswordFieldProps<T>) => {
       const [showPassword, setShowPassword] = useState(false);

       const togglePasswordVisibility = () => {
           setShowPassword((prev) => !prev);
       };
       return (
           <div className="flex justify-start items-end border rounded-lg">
               <Component {...props}
                  type={showPassword ? 'text': 'password'}
                  className="bg-transparent focus:outline-0"
               />
               <button
                   onClick={togglePasswordVisibility}
                   type={"button"}
                    className="flex justify-center items-center"
               >
                   { showPassword ? <EyeIcon />:  <EyeOffIcon /> }
               </button>
           </div>
       )
   }
}


export const PasswordField = withPasswordToggle(FormField);
