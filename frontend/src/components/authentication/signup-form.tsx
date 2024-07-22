import {useForm} from "react-hook-form";
import {SignUpSchema , SignUpSchemaType} from "../../types/authentication/auth.types.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormField} from "./form-field.tsx";
import {PasswordField} from "./password-field.tsx";
import PrimaryButton from "../ui/button.tsx";
import {useSignUpWithCredentials} from "../../services/api/authentication/mutation.tsx";
import {useNavigate} from "react-router-dom";
import {ErrorMessage} from "./error_message.tsx";
import {useAuth} from "../../hooks/auth.hook.ts";



export const SignupForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors}
    } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema)});
    const navigate = useNavigate();
    const {storeUserData} = useAuth()
    const {mutate: signup, isSuccess, isPending, error, isError, data:response} = useSignUpWithCredentials()
    const onSubmit =  async (data: SignUpSchemaType) => {
       signup(data)
    }
    //todo: display error
   if(isSuccess){
       storeUserData(response?.data.data)
       navigate('/auth/signin')

   }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
            { isError &&
                <ErrorMessage
                message={error.response.data.message ?? 'Something went wrong. Please try again later'}
            />
            }
           <FormField<SignUpSchemaType, 'email'>
               type="email"
               placeholder="Your email address"
               name="email"
               isRequired={true}
               label="Enter your email address"
               register={register}
               error={errors.email}
           />
            <FormField<SignUpSchemaType, 'username'>
                type="text"
                placeholder="Username"
                name="username"
                isRequired={true}
                label="Username"
                register={register}
                error={errors.username}
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
                placeholder="+261349852634"
                name="contact"
                isRequired={true}
                label="Contact Number"
                register={register}
                error={errors.contact}
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
            <PrimaryButton   isLoading={isPending} type={"submit"} >
                SIGN UP
            </PrimaryButton>
        </form>
    )
}

