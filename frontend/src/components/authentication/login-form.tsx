import { useForm } from "react-hook-form";
import {
    LoginSchema,
    LoginSchemaType,
} from "../../types/authentication/auth.types.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "./form-field.tsx";
import { PasswordField } from "./password-field.tsx";
import PrimaryButton from "../ui/button.tsx";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook.ts";
import { useLoginWithPasswordAndEmail } from "../../services/api/authentication/mutation.tsx";
import { ErrorMessage } from "./error_message.tsx";
import { isAxiosError } from "../../utils";
import { notify, ToastMessages } from "../ui/toast.tsx";


export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) })
    const { loggedIn } = useAuth();
    const navigate = useNavigate();
    const { mutate: loginWithPasswordAndEmail, isSuccess, error, isError, isPending, } = useLoginWithPasswordAndEmail()
    const onSubmit = async (data: LoginSchemaType) => {
        loginWithPasswordAndEmail(data);
    }
    if (isError) {
        console.log(error);
        notify(error, 'error')
    }
    if (isSuccess) {
        loggedIn()
        notify({ message: 'You are logged in successfully' }, 'success')

        setTimeout(() => {
            navigate('/');
        }, 2000);
    }
    return (
        <>
            <ToastMessages />
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
                {isError &&
                    <ErrorMessage
                        message={
                            isAxiosError(error)
                                ? error.response?.data?.message ?? "An error occurred. Please try again later"
                                : "An unexpected error occurred."
                        }
                    />
                }
                <FormField<LoginSchemaType>
                    type="email"
                    placeholder="Your email address"
                    name="email"
                    label="Enter your email address"
                    register={register}
                    error={errors.email}
                />
                <PasswordField
                    placeholder="Password"
                    name="password"
                    label="Enter your Password"
                    register={register}
                    error={errors.password}
                />
                <div className='flex justify-end items-center mb-4'>
                    <Link to='/auth/reset-password/sent-link' className="text-secondary" >
                        Forgot password ?
                    </Link>
                </div>
                <PrimaryButton isLoading={isPending} type={"submit"}>
                    LOGIN
                </PrimaryButton>
            </form>
        </>
    )
}
