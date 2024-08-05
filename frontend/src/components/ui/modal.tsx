import React from "react";
import PrimaryButton from "./button.tsx";
import {useAppMapContext} from "../../provider/map.provider.tsx";

interface ModalProps {
    children: React.ReactNode,
}
export default function Modal(props: ModalProps){
    const {children} = props;
    const {handleOnCloseModal , isFilterModalOpen} = useAppMapContext()
    if (!isFilterModalOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-[#291E43] bg-opacity-50 flex items-center justify-center">
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
    )
}
