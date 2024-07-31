
export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <span className="w-full bg-danger/10 p-2 text-danger text-md rounded-lg">
      {message}
    </span>
  )
}
