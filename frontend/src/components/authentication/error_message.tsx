
export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <span className="w-full bg-red-100 p-2 text-red-800 text-md rounded-lg">
      {message}
    </span>
  )
}
