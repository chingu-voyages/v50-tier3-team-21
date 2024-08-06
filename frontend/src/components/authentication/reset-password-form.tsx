import {FormField} from "./form-field.tsx";
import {useForm} from "react-hook-form";
import {ResetPasswordSchema , ResetPasswordType} from "../../types/authentication/auth.types.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import PrimaryButton from "../ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {useSendPasswordResetEmail} from "../../services/api/authentication/mutation.ts";
import {ErrorMessage} from "./error_message.tsx";
import {useState} from "react";
import {isAxiosError} from "../../utils";


export  const ResetPasswordForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors}
    } = useForm<ResetPasswordType>({ resolver: zodResolver(ResetPasswordSchema)})
    const navigate = useNavigate();
    const [email, setEmail ] = useState('')
    const {mutate, isPending, isSuccess, isError,error} = useSendPasswordResetEmail();
    const onSubmit = (data: ResetPasswordType) => {
        setEmail(data.email)
        mutate(data)
    }
    if(isSuccess){
        navigate('/auth/reset-password/reset-sent', { state: { email }})
    }
  return(
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
          <FormField<ResetPasswordType>
              type="email"
              placeholder="Enter your email"
              name="email"
              label='Email'
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
