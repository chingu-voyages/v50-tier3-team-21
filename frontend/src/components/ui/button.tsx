
import { ButtonHTMLAttributes, ReactNode } from "react";
import { VariantProps, cva } from "class-variance-authority";
import cn from "../utils/cl";

const buttonVariants = cva("border-2 inline-flex items-center justify-center rounded-md hover:border-dark transition ease-in-out duration-15 shadow uppercase text-sm font-semibold leading-6 px-4 py-2 ", {
    variants: {
        variant: {
            primary: "border-primary text-white bg-primary hover:bg-dark hover:text-white hover:border-dark",
            outline: "border-primary text-primary hover:border-dark hover:text-dark",
            danger: "border-danger bg-danger/30 text-danger hover:bg-danger hover:text-white hover:border-danger",
            ghost: "border-none shadow-none"
        },
    },
    defaultVariants: {
        variant: "primary",
    },
});
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
    children: ReactNode;
}

export default function PrimaryButton({ isLoading = false, children, className, variant, ...props }: ButtonProps) {
    return (
        <button type="button" className={cn(buttonVariants({ variant, className }))} {...props} disabled={isLoading}>
            {
                isLoading ? (
                    <>
                        <span>{children}</span>
                        <span className="icon-[eos-icons--loading] animate-spin -mr-1 ml-3 h-5 w-5"></span>
                    </>
                ) : (
                    children
                )}
        </button>
    );
};
