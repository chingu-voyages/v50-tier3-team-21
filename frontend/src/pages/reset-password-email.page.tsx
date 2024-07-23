import {AuthHeader} from "./signup.page.tsx";
import {ResetPasswordForm} from "../components/authentication/reset-password-form.tsx";


export const ResetPasswordEmailPage = () => {
   return(
       <div className="w-full  md:h-full md:px-6 py-8 flex justify-center items-center ">
            <aside className="w-full flex flex-col gap-10 md:max-w-lg bg-white md:shadow-md p-6 py-12 md:rounded-3xl">
                 <AuthHeader
                     title="Forgot Password"
                     description="No worries, We'll send you instructions for reset"
                 />
                <ResetPasswordForm />
            </aside>
       </div>
   )
}
