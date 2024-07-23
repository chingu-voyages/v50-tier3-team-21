import { SignupForm } from "../components/authentication";
import {HippoLogo} from "../components/ui";
import {Link} from "react-router-dom";


export const SignupPage = () => {
   return (
       <div className="w-full  md:h-full flex justify-center items-center md:px-6 py-5">
           <aside className="w-full flex flex-col gap-5 md:max-w-lg bg-white md:shadow-md p-6 md:rounded-3xl">
               <AuthHeader title="Sign Up" />
               <SignupForm />
               <AuthFooter isSignUp={true} />
           </aside>
       </div>
   )
}



export const AuthHeader = ({title, description}: { title: string, description?: string}) => {
  return(
      <div className="w-full flex flex-col justify-center items-center gap-4">
          <div className="flex flex-col justify-center items-center gap-1">
              <HippoLogo />
              <p className="text-[12px] font-medium">Welcome to Hungry  Hippo</p>
          </div>
          <div className='w-full flex flex-col justify-center items-center '>
              <h1 className=" text-xl md:text-2xl font-bold ">{title}</h1>
              { description && <p className="w-full text-sm md:text-md text-gray-500 text-center">{description}</p> }
          </div>
      </div>
  )
}

export const AuthFooter = ({isSignUp}: { isSignUp: boolean}) => {
    return(
        <p className="mt-2 text-gray-600">
            { isSignUp ?  'Have an Account ?' : "Don't have an account ?" }
            <Link
                to={ isSignUp ? '/auth/signin': '/auth/signup'}
               className="text-secondary ml-2 font-bold ">
                { isSignUp ? "SIGN IN": "SIGN UP"}
            </Link>
        </p>
    )
}

