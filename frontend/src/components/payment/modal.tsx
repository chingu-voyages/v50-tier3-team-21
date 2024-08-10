import React from "react";
import PrimaryButton from "../ui/button.tsx";

interface ModalProps {
    children: React.ReactNode,
    handleOnCloseModal: () => void,
    isOpen: boolean
}
export default function Modal(props: ModalProps){
    const {children, handleOnCloseModal, isOpen} = props;
    return (
        <React.Fragment>
            {
                isOpen && <div className="fixed inset-0 z-50 bg-[#291E43] bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                        <PrimaryButton
                            onClick={handleOnCloseModal}
                            variant="ghost"
                            className="absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-700"
                        >
                            <span className="text-xl">&times;</span>
                        </PrimaryButton>
                        {children}
                    </div>
                </div>
            }
        </React.Fragment>
    )
}
