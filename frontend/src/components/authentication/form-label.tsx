type FormLabelProps = {
    label?: string,
    htmlFor: string,
    className?: string
}
export const FormLabel = ({ label, className, htmlFor }: FormLabelProps) => {
  return(
      <label
          htmlFor={htmlFor}
          className={`text-[1em] ${className}`}
      >
          { label }
      </label>
  )
}
