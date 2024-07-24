import {LoginForm , SignupForm} from "../../components/authentication";
import {AuthFooter , AuthHeader} from "./signup.page.tsx";

export const LoginPage = () => {
  return(
      <div className="w-full md:h-full flex justify-center items-start md:items-center md:px-6 md:py-12">
          <aside className="w-full md:max-w-md flex flex-col gap-6 bg-white md:shadow-md px-6 py-12 md:rounded-3xl">
              <AuthHeader title="Sign In" />
              <LoginForm />
              <AuthFooter isSignUp={false} />
          </aside>
      </div>
  )
}
