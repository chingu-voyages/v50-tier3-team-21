import {FormField} from "./form-field.tsx";
import {useForm} from "react-hook-form";
import {ResetPasswordSchema , ResetPasswordType} from "../../types/authentication/auth.types.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import PrimaryButton from "../ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {useSendPasswordResetEmail} from "../../services/api/authentication/mutation.tsx";
import {ErrorMessage} from "./error_message.tsx";
import {useState} from "react";

export  const ResetPasswordForm = () => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors}
    } = useForm<ResetPasswordType>({ resolver: zodResolver(ResetPasswordSchema)})
    const navigate = useNavigate();
    const [email, setEmail ] = useState('')
    const {mutate, isPending, isSuccess, isError, data,error} = useSendPasswordResetEmail();
    const onSubmit = (data: ResetPasswordType) => {
        mutate(data)
        setEmail(data.email)
    }
    if(isSuccess){
        navigate('/auth/reset-password/reset-sent', { state: { email }})
    }
  return(
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
          {isError && <ErrorMessage message={error.response.data.message} />}
          <FormField<ResetPasswordType, 'email'>
              type="email"
              placeholder="Enter your email"
              name="email"
              label='Email'
              isRequired="true"
              register={register}
              error={errors.email}
          />
          <PrimaryButton isLoading={isPending}  variant={"primary"} type={"submit"}  >
               Reset Password
          </PrimaryButton>
          <PrimaryButton  variant={"outline"}  onClick={() => navigate(-1)}>
              Back
          </PrimaryButton>
      </form>
  )
}
