import { useForm } from "react-hook-form";
import { SignUpSchema, SignUpSchemaType } from "../../types/authentication/auth.types.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "./form-field.tsx";
import { PasswordField } from "./password-field.tsx";
import PrimaryButton from "../ui/button.tsx";
import { useSignUpWithCredentials } from "../../services/api/authentication/mutation.tsx";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "./error_message.tsx";
import { useAuth } from "../../hooks/auth.hook.ts";
import { isAxiosError } from "../../utils";
import { ToastMessages, notify } from "../ui/toast.tsx";
import { useEffect } from "react";




export const SignupForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });
    const navigate = useNavigate();
    const { storeUserData } = useAuth()
    const { mutate: signup, isSuccess, isPending, error, isError, data: response } = useSignUpWithCredentials()
    const onSubmit = async (data: SignUpSchemaType) => {
        signup(data)
    }

    useEffect(() => {
        if (isError) {
            notify({
                message:
                    isAxiosError(error)
                        ? error.response?.data?.message ?? "An error occurred. Please try again later"
                        : "An unexpected error occurred."
            }, 'error')
        }
        if (isSuccess) {
            notify({ message: 'You are registered in successfully' }, 'success')
        }
    }, [isError, isSuccess])


    if (isSuccess) {
        storeUserData(response?.data.data)
        setTimeout(() => {
            navigate('/auth/signin')
        }, 2000);
    }

    return (
        <>
            <ToastMessages />
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                {isError &&
                    <ErrorMessage
                        message={
                            isAxiosError(error)
                                ? error.response?.data?.message ?? "An error occurred. Please try again later"
                                : "An unexpected error occurred."
                        }
                    />
                }
                <FormField<SignUpSchemaType>
                    type="email"
                    placeholder="Your email address"
                    name="email"
                    label="Enter your email address"
                    register={register}
                    error={errors.email}
                />
                <FormField<SignUpSchemaType>
                    type="text"
                    placeholder="Username"
                    name="username"
                    label="Username"
                    register={register}
                    error={errors.username}
                />
                <div className="w-full flex flex-col md:flex-row justify-center items-center gap-2">
                    <FormField<SignUpSchemaType>
                        type="text"
                        placeholder="First name"
                        name="firstName"
                        label="First Name"
                        register={register}
                        error={errors.firstName}
                        className="w-full"

                    />
                    <FormField<SignUpSchemaType>
                        type="text"
                        placeholder="Last name"
                        name="lastName"
                        label="Last Name"
                        register={register}
                        error={errors.lastName}
                        className="w-full"
                    />
                </div>
                <FormField<SignUpSchemaType>
                    type="text"
                    placeholder="+261349852634"
                    name="contact"
                    label="Contact Number"
                    register={register}
                    error={errors.contact}
                />
                <PasswordField
                    label="Enter your Password"
                    placeholder="Password"
                    name="password"
                    register={register}
                    error={errors.password}
                />
                <PasswordField
                    label="Confirm your Password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    register={register}
                    error={errors.confirmPassword}
                />
                <PrimaryButton isLoading={isPending} type={"submit"} >
                    SIGN UP
                </PrimaryButton>
            </form>
        </>
    )
}

