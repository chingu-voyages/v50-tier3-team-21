
import {ButtonHTMLAttributes} from "react";


//Todo: extends props to receive  function types ( primary, secondary)
interface ButtonProps extends  ButtonHTMLAttributes<HTMLButtonElement>{
    label: string
}
export const Button = ({label,...props}: ButtonProps) => {
    return (
        <button {...props}>
            { props }
        </button>
    )

}
