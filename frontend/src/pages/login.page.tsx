import {LoginForm , SignupForm} from "../components/authentication";
import {AuthFooter , AuthHeader} from "./signup.page.tsx";

export const LoginPage = () => {
  return(
      <div className="w-full flex justify-center items-center py-12">
          <aside className="sm:w-full md:max-w-md flex flex-col gap-6 bg-white shadow-md px-6 py-12 rounded-3xl">
              <AuthHeader title="Sign In" />
              <LoginForm />
              <AuthFooter isSignUp={false} />
          </aside>
      </div>
  )
}
