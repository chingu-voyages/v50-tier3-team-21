import {useForm} from "react-hook-form";
import {SignUpSchema , SignUpSchemaType} from "../../types/authentication/auth.types.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormField} from "./form-field.tsx";
import {PasswordField} from "./password-field.tsx";
import PrimaryButton from "../ui/button.tsx";
import {useSignUpWithCredentials} from "../../services/api/authentication/mutation.tsx";
import {useNavigate} from "react-router-dom";



export const SignupForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors}
    } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema)});
    const navigate = useNavigate()
    const {mutate: signup, isSuccess, isLoading, isError, data:response} = useSignUpWithCredentials()
    const onSubmit = async (data: SignUpSchemaType) => {
        signup(data)
        console.log(response)
    }
    //todo: display error
   if(isError){
       navigate('/')
   }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
           <FormField<SignUpSchemaType, 'email'>
               type="email"
               placeholder="Your email address"
               name="email"
               isRequired={true}
               label="Enter your email address"
               register={register}
               error={errors.email}
           />
            <div className="w-full flex flex-col md:flex-row justify-center items-center gap-2">
                <FormField<SignUpSchemaType, 'firstName'>
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    isRequired={true}
                    label="First Name"
                    register={register}
                    error={errors.firstName}
                    className="w-full"

                />
                <FormField<SignUpSchemaType, 'lastName'>
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    isRequired={true}
                    label="Last Name"
                    register={register}
                    error={errors.lastName}
                    className="w-full"
                />
            </div>
            <FormField<SignUpSchemaType, 'contact'>
                type="text"
                placeholder="Your contact number"
                name="contact"
                isRequired={true}
                label="Contact Number"
                register={register}
                error={errors.lastName}
            />
            <PasswordField<SignUpSchemaType>
                label="Enter your Password"
                placeholder="Password"
                name="password"
                isRequired={true}
                register={register}
                error={errors.password}
            />
            <PasswordField<SignUpSchemaType>
                label="Confirm your Password"
                placeholder="Confirm Password"
                name="confirmPassword"
                isRequired={true}
                register={register}
                error={errors.confirmPassword}
            />
            <PrimaryButton   isLoading={isLoading} type={"submit"}>
                SIGN UP
            </PrimaryButton>
        </form>
    )
}

