import React from "react";
import PrimaryButton from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const [isLoading, setIsLoading] = React.useState({
    home: false,
  });
  const navigate = useNavigate();
  const goHome = () => {
    setIsLoading({ ...isLoading, home: true });
    setTimeout(() => {
      setIsLoading({ ...isLoading, home: false });
      navigate('/')
    }, 2000);
  };
  return (
    <>
      <div className="h-screen w-full bg-white flex items-center">
        <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-dark/60">
          <div className="w-full sm:max-w-md space-y-4">
            <div className="bg-notFoundPage bg-contain bg-no-repeat bg-center w-full h-96 sm:h-96 sm:w-96"></div>
            <div className="text-5xl font-dark font-bold">404</div>
            <p
              className="text-2xl md:text-3xl font-light leading-normal"
            >Sorry we couldn't find this page. </p>
            <p className="mb-8">But dont worry, you can find plenty of other things on our homepage.</p>

            <div>
              <PrimaryButton isLoading={isLoading.home} onClick={goHome}>
                {isLoading.home ? 'Taking you home...' : 'Take me home'}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
