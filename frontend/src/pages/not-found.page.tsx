import React from "react";
import PrimaryButton from "../components/ui/button";

export const NotFoundPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const handleClick = () => {
      setIsLoading(true);
      // Simulate some asynchronous operation
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Adjust timeout as needed
    };
  return(
      <div>
          Not found page
          <PrimaryButton isLoading={isLoading} onClick={handleClick}>
        {isLoading ? 'Loading...' : 'Click Me'}
      </PrimaryButton>
      </div>
  )
}
