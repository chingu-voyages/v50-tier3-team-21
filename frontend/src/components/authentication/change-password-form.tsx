import {ErrorMessage} from "./error_message.tsx";
import {
    ChangePasswordSchema ,
    ChangePasswordType ,
} from "../../types/authentication/auth.types.ts";
import PrimaryButton from "../ui/button.tsx";
import {useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router-dom";
import {useChangePassword} from "../../services/api/authentication/mutation.ts";
import {PasswordField} from "./password-field.tsx";
import {isAxiosError} from "../../utils";


export const ChangePasswordForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors}
    } = useForm<ChangePasswordType>({ resolver: zodResolver(ChangePasswordSchema)})
    const navigate = useNavigate();
    const {mutate, isPending, isSuccess, isError,error} = useChangePassword()
    const onSubmit = (data: ChangePasswordType) => {
        mutate(data)
    }
    if(isSuccess){
        navigate('/auth/signin')
    }
    return (

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
        <PrimaryButton isLoading={isPending}  variant={"primary"} type={"submit"}  >
           Change Password
        </PrimaryButton>
        <PrimaryButton  variant={"outline"}  onClick={() => navigate(-1)}>
            Back
        </PrimaryButton>
    </form>
    )
}
