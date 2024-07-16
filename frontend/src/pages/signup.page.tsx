import { SignupForm } from "../components/authentication";
import {HippoLogo} from "../components/ui";
import {Link} from "react-router-dom";


export const SignupPage = () => {
   return (
       <div className="w-full  md:h-full flex justify-center items-center md:px-6 md:py-12">
           <aside className="w-full flex flex-col gap-5 md:max-w-md bg-white shadow-md p-6 rounded-3xl">
               <AuthHeader title="Sign Up" />
               <SignupForm />
               <AuthFooter isSignUp={true} />
           </aside>
       </div>
   )
}



export const AuthHeader = ({title}: { title: string}) => {
  return(
      <div className="w-full flex flex-col justify-center items-center gap-2">
          <div className="flex flex-col justify-center items-center gap-1">
              <HippoLogo />
              <p className="text-[12px] font-medium">Welcome to Hungry  Hippo</p>
          </div>
          <h1 className="text-2xl">{title}</h1>
      </div>
  )
}

export const AuthFooter = ({isSignUp}: { isSignUp: boolean}) => {
    return(
        <p className="mt-2 text-gray-600">
            { isSignUp ?  'Have an Account ?' : "Don't have an account ?" }
            <Link
                to={ isSignUp ? '/auth/signin': '/auth/signup'}
               className="text-blue-500 ml-2">
                { isSignUp ? "Sign In": "Sign Up"}
            </Link>
        </p>
    )
}

