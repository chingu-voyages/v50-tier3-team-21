import imageNotFound from "../../assets/404.png";

interface FoodImageProps {
  src: string;
  alt: string;
}

  export const FoodImage = ({ src, alt }: FoodImageProps) => {
    // if the URL is broken, check to see if 404 has been given, if not, make src 404
    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        if (e.currentTarget.src !== imageNotFound) {
          e.currentTarget.src = imageNotFound;
        }
      };
    
     return (
        <img src={src} alt={alt} onError={handleError} />
    )
  }
  