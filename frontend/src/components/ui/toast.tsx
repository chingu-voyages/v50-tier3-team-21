import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type toastTypes = 'success' | 'error';

export const notify = ({ message }: { message: string }, type: toastTypes) => {
    const icon = type === 'success' ? (
        <span className='bg-primary/10  rounded p-1 flex items-center'>
            <span className={`icon-[iconamoon--check-duotone] w-6 h-6 bg-primary`} />
        </span>
    ) : (
        <span className='bg-danger/10  rounded p-1 flex items-center'>
            <span className="icon-[ph--warning-duotone] w-6 h-6 bg-danger" />
        </span>
    );

    toast[type](message, {
        position: "bottom-right",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        autoClose: 3000,
        icon: icon,
        className: `toast-body-${type}`
    });

};

const CustomCloseButton = () => {
    return (
        <button type="button" className="close-button" >
            <span className="icon-[iconamoon--close-duotone] w-6 h-6 bg-dark"></span>
        </button>
    );
};

export const ToastMessages = () => {
    return <ToastContainer toastClassName="py-6 px-5 rounded-lg shadow-lg shadow-dark/5 " bodyClassName="text-sm text-dark/60 gap-2 " closeButton={CustomCloseButton} />;
}