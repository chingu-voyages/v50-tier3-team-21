import React from "react";
import PrimaryButton from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const goHome = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/')
    }, 2000);
  };
  return (
    <>
      <div className="h-screen w-full bg-white flex items-center">
        <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
          <div className="max-w-md space-y-4">
            <div className="text-5xl font-dark font-bold">404</div>
            <p
              className="text-2xl md:text-3xl font-light leading-normal"
            >Sorry we couldn't find this page. </p>
            <p className="mb-8">But dont worry, you can find plenty of other things on our homepage.</p>

            <PrimaryButton isLoading={isLoading} onClick={goHome}>
              {isLoading ? 'Taking you home...' : 'Take me home'}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  )
}
