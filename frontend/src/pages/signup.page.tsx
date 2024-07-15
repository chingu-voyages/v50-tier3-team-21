import { SignupForm } from "../components/authentication";
import {HippoLogo} from "../components/ui";


export const SignupPage = () => {
   return (
       <div className="w-full flex justify-end px-24 py-2">
           <aside className="w-full md:max-w-md  p-5 rounded-3xl">
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
              <p className="text-sm font-bold">Welcome to Hungry  Hippo</p>
          </div>
          <h1 className="text-4xl">Sign up</h1>
      </div>
  )
}

