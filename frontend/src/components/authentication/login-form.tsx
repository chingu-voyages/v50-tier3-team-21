import {useForm} from "react-hook-form";
import {
    LoginSchema ,
    LoginSchemaType ,
} from "../../types/authentication/auth.types.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormField} from "./form-field.tsx";
import {PasswordField} from "./password-field.tsx";
import PrimaryButton from "../ui/button.tsx";

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors}
    } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema)})

    const onSubmit = async (data: LoginSchemaType) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
            <FormField<LoginSchemaType, 'email'>
                type="email"
                placeholder="Your email address"
                name="email"
                isRequired={true}
                label="Enter your email address"
                register={register}
                error={errors.email}
            />
            <PasswordField<LoginSchemaType>
                placeholder="Password"
                name="password"
                label="Enter your Password"
                isRequired={true}
                register={register}
                error={errors.password}
            />

            <PrimaryButton  isLoading={false} type={"submit"}>
                LOGIN
            </PrimaryButton>
        </form>
    )
}
