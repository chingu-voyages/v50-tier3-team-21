import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type toastTypes = 'success' | 'error'

export const notify = ({ message }: { message: string }, type: toastTypes) => {
    toast[type](message, {
        position: "top-right",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

export const ToastMessages = () => {
    return <ToastContainer />;
}