import {ErrorMessage} from "./error_message.tsx";
import {FormField} from "./form-field.tsx";
import {
    ChangePasswordSchema ,
    ChangePasswordType ,
    ResetPasswordSchema ,
    ResetPasswordType ,
    SignUpSchemaType
} from "../../types/authentication/auth.types.ts";
import PrimaryButton from "../ui/button.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useChangePassword , useSendPasswordResetEmail} from "../../services/api/authentication/mutation.tsx";
import {PasswordField} from "./password-field.tsx";

export const ChangePasswordForm = () => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors}
    } = useForm<ChangePasswordType>({ resolver: zodResolver(ChangePasswordSchema)})
    const navigate = useNavigate();
    const {mutate, isPending, isSuccess, isError, data,error} = useChangePassword()
    const onSubmit = (data: ChangePasswordType) => {
        mutate(data)
    }
    if(isSuccess){
        navigate('/auth/signin')
    }
    return (

    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
        {isError && <ErrorMessage message={error.response.data.message} />}
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
        <PrimaryButton isLoading={isPending}  variant={"primary"} type={"submit"}  >
           Change Password
        </PrimaryButton>
        <PrimaryButton  variant={"outline"}  onClick={() => navigate(-1)}>
            Back
        </PrimaryButton>
    </form>
    )
}
