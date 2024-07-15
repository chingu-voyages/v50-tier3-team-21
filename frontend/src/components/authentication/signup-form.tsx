import {useForm} from "react-hook-form";
import {SignUpSchema , SignUpSchemaType} from "../../types/authentication/auth.types.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormField} from "./form-field.tsx";
import {PasswordField} from "./password-field.tsx";
import PrimaryButton from "../ui/button.tsx";



export const SignupForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors}
    } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema)})

    const onSubmit = async (data: SignUpSchemaType) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5 py-5">
           <FormField<SignUpSchemaType, 'email'>
               type="email"
               placeholder="Your email address"
               name="email"
               isRequired={true}
               label="Enter your email address"
               register={register}
               error={errors.email}
           />
            <div className="w-full flex justify-center items-center gap-2">
                <FormField<SignUpSchemaType, 'firstname'>
                    type="text"
                    placeholder="First name"
                    name="firstname"
                    isRequired={true}
                    label="First Name"
                    register={register}
                    error={errors.firstname}
                    className="w-full"

                />
                <FormField<SignUpSchemaType, 'lastname'>
                    type="text"
                    placeholder="Last name"
                    name="lastname"
                    isRequired={true}
                    label="Last Name"
                    register={register}
                    error={errors.lastname}
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
                error={errors.lastname}
            />
            <PasswordField<SignUpSchemaType>
                placeholder="Password"
                name="password"
                isRequired={true}
                register={register}
                error={errors.password}
            />
            <PasswordField<SignUpSchemaType>
                placeholder="Confirm Password"
                name="confirmPassword"
                isRequired={true}
                register={register}
                error={errors.confirmPassword}
            />
            <PrimaryButton  isLoading={false} type={"submit"}>
                SIGN UP
            </PrimaryButton>
        </form>
    )
}

