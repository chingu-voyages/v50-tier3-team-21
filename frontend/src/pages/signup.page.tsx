import { SignupForm } from "../components/authentication";
import {HippoLogo} from "../components/ui";


export const SignupPage = () => {
   return (
       <div className="w-full flex justify-center items-center px-6 py-6">
           <aside className="sm:w-full md:max-w-md  rounded-3xl">
               <AuthHeader />
               <SignupForm />
           </aside>
       </div>
   )
}



const AuthHeader = () => {
  return(
      <div className="w-full flex flex-col justify-center items-center gap-3">
          <div className="flex flex-col justify-center items-center gap-1">
              <HippoLogo />
              <p className="text-[12px] font-medium">Welcome to Hungry  Hippo</p>
          </div>
          <h1 className="text-3xl">Sign up</h1>
      </div>
  )
}

