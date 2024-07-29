import { Bounce, ToastContainer, toast } from 'react-toastify';

export const ErrorMessage = ({ message }: { message: string }) => {
  const notify = () => toast(message);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  )
}
