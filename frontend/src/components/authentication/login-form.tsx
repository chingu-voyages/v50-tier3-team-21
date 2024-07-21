import {useForm} from "react-hook-form";
import {
    LoginSchema ,
    LoginSchemaType ,
} from "../../types/authentication/auth.types.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormField} from "./form-field.tsx";
import {PasswordField} from "./password-field.tsx";
import PrimaryButton from "../ui/button.tsx";
import {Link , useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/auth.hook.ts";
import {useLoginWithPasswordAndEmail} from "../../services/api/authentication/mutation.tsx";
import {data} from "autoprefixer";
import {ErrorMessage} from "./error_message.tsx";

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors}
    } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema)})
    const { loggedIn } = useAuth();
    const navigate = useNavigate();
    const { mutate: loginWithPasswordAndEmail , isSuccess, error, isError, isPending, data: response} = useLoginWithPasswordAndEmail()
    const onSubmit = async (data: LoginSchemaType) => {
        loginWithPasswordAndEmail(data);
    }
    if(isError){
        console.log(error)
    }
    if(isSuccess) {
        loggedIn()
        navigate('/')
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
            { isError &&
                <ErrorMessage
                    message={error.response.data.message ?? 'Something went wrong. Please try again later'}
                />
            }
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
            <div className='flex justify-end items-center mb-4'>
               <Link to='/auth' className="text-secondary" >
                   Forgot password ?
               </Link>
            </div>
            <PrimaryButton  isLoading={isPending} type={"submit"}>
                LOGIN
            </PrimaryButton>
        </form>
    )
}
